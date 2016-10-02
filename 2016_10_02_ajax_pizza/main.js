// creating objects
var recipeMargarita = {}

function getObjectValues(obj) {
    var keys = Object.keys(obj)
    return keys.map(function(key) {
        return obj[key]
    })
}


function renderIngridients(ingridients) {
    function renderIngridient(ingridient) {
        return '<li>' + ingridient.name + '</li>'
    }

    var result = ingridients.map(renderIngridient)
    return '<ul class="js-ingridients">' + result.join('') + '</ul>'
}

function renderHtml(recipes) {
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
}

function getRecipes(ingridients, endCallback) {
    $.ajax({
        dataType: "json",
        data: 'text',
        url: 'http://localhost:8080/2016_10_02_ajax_pizza/pizza.json',
        success: function(data) {

            var values = getObjectValues(data)
            values.forEach(function (value) {
                value.ingridients = value.ingridients.map(function (ingrName) {
                    return ingridients[ingrName]
                })
            })
            console.log(data)
            var recipes = data

            endCallback.apply(null, [recipes])
        }
    });
}

$(function () {
    $.getJSON("ingridients.json", function (ingridients) {
        getRecipes(ingridients, function (recipes) {
            renderHtml(recipes)
        })
        console.log(ingridients)
    })

})


