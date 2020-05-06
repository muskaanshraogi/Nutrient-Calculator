const express = require('express')
const cors = require('cors')
const axios = require('axios')
const resultFunc = require('./result')
const round = require('./round')
const port = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(express.json())

app.get('/search', (req, res) => {

    const API_KEY = '6AZXI6G1MENZjo2gI3jnhXtOJm1xEoU1V4pAMXCj'
    const items = req.query.recipe.split('\n')
    const servings = req.query.servings
    var arr = []
    var quantity = 100
    var counter = 0
    var result = {
        'energy' : 0,
        'carbohydrates' : 0,
        'protien' : 0,
        'sugar' : 0,
        'calcium' : 0,
        'potassium' : 0,
        'cholestrol' : 0,
        'iron' : 0,
        'water' : 0
    }
    
    try {
        for(const item of items) {
            parts = item.split('-')

            if(!parseInt(parts[0]) || parts.length !== 3) {
                throw new Error('Ingredients not formatted correctly.')
            }

            if(parts[1] === 'whole') {
                quantity = parseInt(parts[0])*100
            }
            else if(parts[1] === 'cup' || parts[1] === 'cups') {
                quantity = parseInt(parts[0])*200
            }
            else {
                quantity = parseInt(parts[0])
            }

            axios.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + API_KEY, {
                'query' : parts[2],
                'dataType' : ['SR Legacy'],
                'requireAllWords' : true,
            })
            .then(async (response) => {
                counter++
                arr = await response.data.foods.filter((food) => {
                    return food.scientificName
                })

                if(!arr[0]) {
                    arr = await response.data.foods.filter((food) => {
                        return !food.ingredients
                    })
                }

                if(!arr[0]) {
                    throw new Error('Ingredient(s) not found.')
                }

                for(const nutrient of arr[0].foodNutrients){
                    resultFunc(nutrient, result, servings, quantity)
                }
                round(result)
        
                if(counter === items.length) {
                    res.status(200).send(result)
                }
            })
            .catch((error) => {
                res.status(500).send(error)
            })
        }
        
    }
    catch(error) {
        res.status(400).send(error)
    }

})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`)
})