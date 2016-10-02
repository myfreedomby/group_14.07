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

function getRecipes(ingridients) {
    var url = 'http://localhost:8080/2016_10_02_ajax_pizza/pizza.json'

    var rawRecipes = fetch(url).then(function (response) {
        return response.json()
    })
    var resultPromise = Promise.all(rawRecipes, ingridients).then(function (resolvedRecipes, resolvedIngridients) {
        var values = getObjectValues(resolvedRecipes)
        values.forEach(function (value) {
            value.ingridients = value.ingridients.map(function (ingrName) {
                return resolvedIngridients[ingrName]
            })
        })
        var recipes = resolvedIngridients
        return recipes
    })

    return resultPromise
}

$(function () {
    var url = 'ingridients.json'

    var ingridients = fetch(url).then(function(response) {
        if(response.status === 200) return response.json();
        else throw new Error('Something went wrong on api server!');
    })
    var recipes = getRecipes(ingridients).then(function (recipes) {
        renderHtml(recipes)
    })
})


