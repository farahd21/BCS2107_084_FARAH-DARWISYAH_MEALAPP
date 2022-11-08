
//Passing new variable for each get element 
var searchBtn = document.getElementById('search-btn');
var mealList = document.getElementById('meal');
var mealDetailsContent = document.querySelector('.meal-details-content');
var recipeCloseBtn = document.getElementById('recipe-close-btn');



// event listeners, add new function
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

//Close button
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});



//function getMealList to get the meals that entered by user
function getMealList(){
    let searchMeal = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`) //Meal API to fetch meal data 
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => { //Get meal id,Looping and display display image, name of the meal, and area
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}"> 
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food"> 
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <h4>From : ${meal.strArea}</h4>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } 
        else{
            html = "Sorry, we didn't find any meal!"; //Display message if not found
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal by look up the id of the meal that user choose
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`) //Meal API to fetch the meal id
        .then(response => response.json())
        .then(data => mealRecipe(data.meals)); //create function and passing meals
    }
}

//display name, category, instructions,image and ingredients from meals id when clicking button 'Get Recipe'
function mealRecipe(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-instruct">
            <h3>Ingredients:</h3>
            <p>${meal.strIngredient1}</p>
            <p>${meal.strIngredient2}</p>
            <p>${meal.strIngredient3}</p>
            <p>${meal.strIngredient4}</p>
            <p>${meal.strIngredient5}</p>
            <p>${meal.strIngredient6}</p>
            <p>${meal.strIngredient7}</p>
            <p>${meal.strIngredient8}</p>
            <p>${meal.strIngredient9}</p>
            <p>${meal.strIngredient10}</p>
        </div>
        <div class = "meal-name">
            
            <a href = "crud.html" class = "go-to-crud-btn"> Make My Own Note</a>
        </div>
        
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}





