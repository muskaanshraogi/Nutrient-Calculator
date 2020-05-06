

const round = (result) => {

    result['energy'] = result['energy'].toFixed(2)
    result['carbohydrates'] = result['carbohydrates'].toFixed(2)
    result['sugar'] = result['sugar'].toFixed(2)
    result['protien'] = result['protien'].toFixed(2)
    result['potassium'] = result['potassium'].toFixed(2)
    result['calcium'] = result['calcium'].toFixed(2)
    result['water'] = result['water'].toFixed(2)
    result['cholestrol'] = result['cholestrol'].toFixed(2)
    result['iron'] = result['iron'].toFixed(2)
}

module.exports = round;