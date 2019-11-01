var colors = [];
var pickedColor;
var clickedColor;
var squareNum;
var gameLevel;
var backgroundColor = "steelblue";
var squareTiles = document.querySelectorAll(".square");
var pickedColorDisplay = document.querySelector("#pickedColorDisplay");
var displayResult = document.getElementById("displayResult");
var resetButton = document.querySelector("#reset");
var gameEasy = document.querySelector("#btn-easy");
var gameHard = document.querySelector("#btn-hard");


init();

//initialization function when program is called
function init(){

	gameHard.classList.add("selected");
	squareNum = 6
	//set up the sqaure tiles based on level hard
	setUpSquareTiles(squareNum);

	//add event to the square
	addEventToSquareTiles();

	//add reset button event listener
	resetButton.addEventListener("click", function(){
		reset(squareNum);
	})

	gameEasy.addEventListener("click", function(){
		gameHard.classList.remove("selected");
		gameEasy.classList.add("selected");
		squareNum = 3
		reset(squareNum);
	})

	gameHard.addEventListener("click", function(){
		gameHard.classList.add("selected");
		gameEasy.classList.remove("selected");
		squareNum = 6
		reset(squareNum);
	})

}

//reset function
function reset(numArr){
	//game resets to hard level by default
	displayResult.textContent = ""
	setUpSquareTiles (squareNum);
	pickedColorDisplay.style.backgroundColor = backgroundColor;
	resetButton.textContent = "New Colors";
}


//function to setup the square Tiles based on game level
function setUpSquareTiles(numArr){
	colors = generateRandomColorsArray(numArr);
	pickedColor = pickColor(numArr);
	pickedColorDisplay.textContent = pickedColor;
		for (var i=0; i<squareTiles.length; i++){
			if (colors[i]) { 
				squareTiles[i].style.display = "inline-block";				
				squareTiles[i].style.backgroundColor = colors[i];
			} else {
				squareTiles[i].style.display = "none";	
			}
		}
}

//function that adds events to square;
function addEventToSquareTiles() {
	for (var i=0; i<squareTiles.length; i++) {
		squareTiles[i].addEventListener("click", function(){
			clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				displayResult.textContent = "Correct!!";
				changeColorSquareTiles(pickedColor);
				pickedColorDisplay.style.backgroundColor = pickedColor;
				resetButton.textContent = "New Game?"
			} else {
				displayResult.textContent = "Try Again!"
				this.style.backgroundColor = "#232323";
				resetButton.textContent = "New Colors"
			}
		})
	}
}


//function to assign picked color to all the tiles when user guessed it right!

function changeColorSquareTiles(color){
	for (var i=0; i<squareTiles.length; i++){
		squareTiles[i].style.backgroundColor = color;
	}
}

//function to create an array of random colors

function generateRandomColorsArray(numArr) {
	var randomColorArr = [];
	var result;

	for (var i=0; i<numArr; i++){
		result = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
		randomColorArr.push(result);
	}

	return randomColorArr;
}

//function to pick random color from colors array
function pickColor(numArr){
	return colors[Math.floor(Math.random() * numArr)];
}