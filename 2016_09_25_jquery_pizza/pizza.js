Object.prototype.values = function(obj) {
    var keys = Object.keys(obj)
    return keys.map(function(key) {
        return obj[key]
    })
}


var INGRIDIENTS = {
    'cheese': {
        name: 'cheese',
        weight: 50,
        calories: 50
    },
    'sauce': {
        name: 'sauce',
        weight: 10,
        calories: 20
    },
    'mozzarela': {
        name: 'mozzarela',
        weight: 25,
        calories: 25
    },
    'camamber': {
        name: 'camamber',
        weight: 25,
        calories: 25
    },
    'feta': {
        name: 'feta',
        weight: 25,
        calories: 25
    },
    'peperoni': {
        name: 'peperoni',
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

function renderIngridients(ingridients) {
    function renderIngridient(ingridient) {
        return '<li>' + ingridient.name + '</li>'
    }
    var result = ingridients.map(renderIngridient)
    return '<ul class="js-ingridients">' + result.join('') + '</ul>'
}

$(function() {
    var $select = $('.js-choose-recipe')
    var $chosenRecipe = $('.js-chosen-recipe')

    Object.values(recipes).forEach(function(recipe) {
        var $option = $('<option value="'+ recipe.id +'">' + recipe.name + '</option>')
        $select.append($option)
    })

    $select.on('change', function() {
        var chosenValue = $select.val()

        var chosenRecipe = recipes[chosenValue]
        if (chosenRecipe === undefined) {
            $('.js-ingridients').remove()
            $chosenRecipe.text('Ничего не выбрано')

        }
        console.log(chosenRecipe)

        var pizza = new Pizza(chosenRecipe)

        $chosenRecipe.text(chosenRecipe.name)
        var ingridientsHtml = renderIngridients(chosenRecipe.ingridients)
        console.log(ingridientsHtml)
        $('.js-ingridients').remove()
        $chosenRecipe.after(ingridientsHtml)

    })

})
