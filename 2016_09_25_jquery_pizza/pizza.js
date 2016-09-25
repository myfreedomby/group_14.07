Object.prototype.values = function(obj) {
    var keys = Object.keys(obj)
    return keys.map(function(key) {
        return obj[key]
    })
}


var INGRIDIENTS = {
    'cheese': {
        weight: 50,
        calories: 50
    },
    'sauce': {
        weight: 10,
        calories: 20
    },
    'mozzarela': {
        weight: 25,
        calories: 25
    },
    'camamber': {
        weight: 25,
        calories: 25
    },
    'feta': {
        weight: 25,
        calories: 25
    },
    'peperoni': {
        weight: 20,
        calories: 20
    }
}
function Pizza(recipe) {
    // правила создания объекта - его инициализация
    // this который доступен в этой функции - это новый объект, который будет создан если функцию вызвать с new
    this.base = recipe.base
    this.ingridients = recipe.ingridients
}

Pizza.prototype = { // or Object.create
    getWeight: function() { // 'эта функция называется метод объекта
        // this такой же как в функции-конструкторе
        // мы можем из него брать любые свойства
        var ingridientWeights = this.ingridients
            .map(function(el) {
                return el.weight
            })

        var allIngridientsWeight = ingridientWeights.reduce(function(sum, cur) {
            return sum + cur
        }, this.base.weight)
        return allIngridientsWeight
    },
    getCalories: function() {
        return this.calories
    }
}

// creating objects
var recipeMargarita = {
    id: 'margarita',
    name: 'Margarita',
    base: {
        weight: 100,
        calories: 30
    },
    ingridients: [
        INGRIDIENTS.cheese,
        INGRIDIENTS.sauce,
        INGRIDIENTS.mozzarela
    ]
}

var recipes = {
    'margarita': recipeMargarita,
    'four_cheeses': {
        id: 'four_cheeses',
        name: 'Four cheeses',
        base: {
            weight: 200,
            calories: 120
        },
        ingridients: [
            INGRIDIENTS.cheese,
            INGRIDIENTS.mozzarela,
            INGRIDIENTS.camamber,
            INGRIDIENTS.feta,
            INGRIDIENTS.sauce
        ]
    }
}
//var pizza = new Pizza(recipeMargarita)
//console.log('pizza weight: ', pizza.getWeight())






function logEvent(e) {
    alert('hello!')
    console.log(e)
}

$(function() {
    var $select = $('.js-choose-recipe')

    Object.values(recipes).forEach(function(recipe) {
        var $option = $('<option value="'+ recipe.id +'">' + recipe.name + '</option>')
        $select.append($option)
    })

    $select.on('change', function() {
        var chosenValue = $select.val()
        var chosenRecipe = recipes[chosenValue]
        console.log(chosenRecipe)

        var pizza = new Pizza(chosenRecipe)
        $('.js-chosen-recipe').text(chosenRecipe.name)

    })

})
