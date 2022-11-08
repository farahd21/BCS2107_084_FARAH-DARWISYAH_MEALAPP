const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

//passing new variable for each element of Id
var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var btnUpdate = document.getElementById('btnUpdate')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

//path for txt files save in folder 'Files'
let pathName = path.join(__dirname, 'Files')

//addEventlisterer for Create Button
btnCreate.addEventListener('click', function(){  //creating text file when user click CREATE button
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  fs.writeFile(file, contents, function(err){ 
    if(err){
      return console.log(err)
    }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + " text file was created")    
    console.log("The file was created")
  
  })
  
})

//addEventlisterer for Read Button
btnRead.addEventListener('click', function(){  //read contents of the created text file
  let file = path.join(pathName, fileName.value)
 
  fs.readFile(file, function(err, data){ 
    if(err){
      return console.log(err)
    }
    fileContents.value = data
    alert("Read " + txtfile)    

    console.log("The file was read!")
  })
  
})

//addEventlisterer for Delete Button
btnDelete.addEventListener('click', function(){  
  let file = path.join(pathName, fileName.value)
 
  fs.unlink(file, function(err){ 
    if(err){
      return console.log(err)
    }
    fileName.value = ""
    fileContents.value = ""
    console.log("The file was deleted!")
    alert(txtfile + " text file was deleted") 

  })
  
})

//addEventlisterer for Update Button
btnUpdate.addEventListener('click', function(){  //creating text file when user click CREATE button
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  fs.writeFile(file, contents, function(err){ 
    if(err){
      return console.log(err)
    }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + " text file was updated")    
    console.log("The file was created")
  
  })
  
})

//function when button from crud.html is clicked
function buttonClicked(){
  var meal = document.getElementById("meal_input").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`) //Meal API
  .then(res=>res.json())
  .then((data) => {

      console.log(data);

      var i = data;

      //get ingredients for selected meals and display in html file
      display.innerHTML = "Ingredients: " + " " + i.meals[0].strIngredient1 + ", " + i.meals[0].strIngredient2 + ", " + i.meals[0].strIngredient3 + ", " + i.meals[0].strIngredient4 + ", " + i.meals[0].
      strIngredient15 + ", " + i.meals[0].strIngredient6 + ", " + i.meals[0].strIngredient7 + ", " + i.meals[0].strIngredient8 + ", " + i.meals[0].
      strIngredient9;

      document.getElementById("display").innerHTML = display.innerHTML

  })
  
}
