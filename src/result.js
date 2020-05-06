

const resultFunc = (nutrient, result, serving, quantity) => {

    const value = (((nutrient.value/100)*quantity)/serving)
    if(nutrient.nutrientId == 1008) {
        result['energy'] += value
    }
    else if(nutrient.nutrientId == 1005) {
        result['carbohydrates'] += value
    }
    else if(nutrient.nutrientId == 1003) {
        result['protien'] += value
    }
    else if(nutrient.nutrientId == 2000) {
        result['sugar'] += value
    }
    else if(nutrient.nutrientId == 1087) {
        result['calcium'] += value
    }
    else if(nutrient.nutrientId == 1092) {
        result['potassium'] += value
    }
    else if(nutrient.nutrientId == 1253) {
        result['cholestrol'] += value
    }
    else if(nutrient.nutrientId == 1089) {
        result['iron'] += value
    }
    else if(nutrient.nutrientId == 1051) {
        result['water'] += value
    }
}

module.exports = resultFunc;