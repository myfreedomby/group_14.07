// creating objects
var recipeMargarita = {}

function getObjectValues(obj) {
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


var recipes = {
    'margarita': {
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
    },
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


function renderIngridients(ingridients) {
    function renderIngridient(ingridient) {
        return '<li>' + ingridient.name + '</li>'
    }

    var result = ingridients.map(renderIngridient)
    return '<ul class="js-ingridients">' + result.join('') + '</ul>'
}

$(function () {
    var $select = $('.js-choose-recipe')
    var $chosenRecipe = $('.js-chosen-recipe')

    getObjectValues(recipes).forEach(function (recipe) {
        var $option = $('<option value="' + recipe.id + '">' + recipe.name + '</option>')
        $select.append($option)
    })

    $select.on('change', function () {
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

    $.ajax({
        dataType: "json",
        data: 'text',
        url: 'http://localhost:8080/2016_10_02_ajax_pizza/ingridients.json',
        success: function(data) {
            console.log(data)
        }
    });
    // $.getJSON("ingridients.json", function (data) {
    //     console.log(data)
    // })

})


