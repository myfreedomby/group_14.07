



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



