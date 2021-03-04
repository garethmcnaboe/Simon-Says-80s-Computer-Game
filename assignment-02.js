//In my preparation to do the assignment I watched a video on youtube by freecodecamp.org
//on a Simon game to get an understanding of how to structure the code.
//constants to be used for use in code
let numflash; //to record which flash in a sequence we are at.
let numturn; //to record the no. of the turn / total no. of flashes in that turn.
let gameInProgress; //boolean to record that a game is in progress
let countdown;// this records how long a player has to input the next circle / 5 seconds / set later.
let playerGood; //boolean - whether the player is correctly inputting the sequence.
let computerTurn; //boolean - whether it is the computers turn or human play
let computerOrder = [];  //order in which the computer will flash the lights
let playerOrder = []; //used to record the inputs by the player
let roundInterval; //this records the set interval command which is repeated
let highScore; //records the high score on the game as a string.
let highScoreInt; //records high score as an int after it is parsed from the String.

const turnCounter = document.querySelector("#turnCounter");
const startButton = document.querySelector("#startButton");
const HighScoreDisplay = document.querySelector("#HighScore");

//Methods to flash individual circles white.
function flashGreen(){
  document.getElementById("greenCircle1").style.backgroundColor = "white";
  }
function flashRed(){
  document.getElementById("redCircle1").style.backgroundColor = "white";
  }
function flashYellow(){
  document.getElementById("yellowCircle1").style.backgroundColor = "white";
  }
function flashBlue(){
  document.getElementById("blueCircle1").style.backgroundColor = "white";
  }

//Method to turn all circles white.
function flashAll(){
  document.getElementById("greenCircle1").style.backgroundColor = "white";
  document.getElementById("redCircle1").style.backgroundColor = "white";
  document.getElementById("blueCircle1").style.backgroundColor = "white";
  document.getElementById("yellowCircle1").style.backgroundColor = "white";
}

//Method to turn individual / all circles back to their original colors.
function clearAll(){
  document.getElementById("greenCircle1").style.backgroundColor = "green";
  document.getElementById("redCircle1").style.backgroundColor = "Red";
  document.getElementById("blueCircle1").style.backgroundColor = "blue";
  document.getElementById("yellowCircle1").style.backgroundColor = "yellow";
}

//Method which can be called at the end of the game to flash all the circles five times.
function endGameFlashes(){
    for(let i=1; i<6; i++){
      setTimeout(()=>{
        flashAll();
        setTimeout(()=>{
          clearAll();
        },150);
      }, (i * 750));
    }
}

//Event listeners to record player inputs and record them in playerOrder array.
document.getElementById("greenCircle1").addEventListener('click', (event) => {
  clearTimeout(countdown); //stops the 5 second timer which would end the game.
  playerOrder.push(1); //add number 1 to player array to be checked later
  checkInput(); //checks if input is correct
  flashGreen(); //flash green circle and then clear after 0.25 seconds
  setTimeout(() =>{
      clearAll();
    }, 250);
});

document.getElementById("redCircle1").addEventListener('click', (event) =>{
  clearTimeout(countdown); //stops the 5 second timer which would end the game.
  playerOrder.push(2); //adds number 2 to player array to be checked later
  checkInput(); //checks if input is correct
  flashRed();
  setTimeout(() =>{
      clearAll();
    }, 250);
});

document.getElementById("blueCircle1").addEventListener('click', (event) =>{
  clearTimeout(countdown); //stops the 5 second timer which would end the game.
  playerOrder.push(3); //adds number 3 to player array to be checked later
  checkInput(); //checks if input is correct
  flashBlue();
  setTimeout(() =>{
      clearAll();
    }, 250);
});

document.getElementById("yellowCircle1").addEventListener('click', (event) =>{
  clearTimeout(countdown); //stops the 5 second timer which would end the game.
  playerOrder.push(4); // adds number 4 to player array to be checked later
  checkInput(); //checks if input is correct
  flashYellow();
  setTimeout(() =>{
      clearAll();
    }, 250);
});

//This timer function starts a 5 second countdown which will stop the game if there is no input
//It is called by the check() function
//It is cleared each time the circle event listeners are triggered.
function setTimer(){
countdown = setTimeout(
  function(){
  playerGood = false;
  }, 5000);
}

//Start Button - turns indicator green and starts game after 3 seconds
startButton.addEventListener('click', (event) =>{
    checkCookie();

    gameInProgress = true; //confirm game is in progress - used later to end game
    document.getElementById("gameindicator1").style.backgroundColor = "green"; //change color of indicator light
    //starts game after 3 second delay
    setTimeout(() =>{
        playGame();
      }, 3000);
});

//Method to start game and generate an random array of computer inputs
function playGame(){
  computerOrder = [];
  playerOrder = [];
  numturn = 1;
  turnCounter.innerHTML = "0"+ numturn; //display turnCounter as 01 rather than 1
  numflash = 0; //will be used as the indicator in the arrays
  roundInterval = 0;
  playerGood = true;

  //for loop which will create 100 random numbers between 1 and 4.
  //they are placed into the computer array to be recalled to control which circle flashes.
  for(var i = 0; i < 100; i++){
    computerOrder.push(Math.floor(Math.random() * 4) + 1);
  }
  computerTurn = true;
  roundInterval = setInterval(gameRound, 1000);
}

function gameRound(){
  //will indicate when the computers turn is over
  if(numflash == numturn){
      clearInterval(roundInterval);
      computerTurn = false;
      clearAll();
  //start the timer so that player has to start entering signal within five seconds
      setTimer();
  }

  if(computerTurn){
    clearAll();
    //will flash the correct circle based on which number is the computer array 1.Green/2.Red/3.Blue/4.Yellow
    setTimeout(() =>{
        if(computerOrder[numflash] == 1)
        flashGreen();
        if(computerOrder[numflash] == 2)
        flashRed();
        if(computerOrder[numflash] == 3)
        flashBlue();
        if(computerOrder[numflash] == 4)
        flashYellow();
        numflash++;
      },300);
    }
  }

//method used to check if that player has input correctly.
function checkInput(){
    //this will check to see if the players last input is correct.
    if(playerOrder[playerOrder.length - 1] !== computerOrder[playerOrder.length-1]){
      playerGood = false;
      }

    //reset the time so that the player has to input the next signal
    if(numturn > playerOrder.length){
      setTimer();
    }
    //if the player has made a mistake this block will end the game.
    //need to recheck this code. not sure it is complete.
    if(playerGood == false){
        endGameFlashes(); //call method to flash all circles five times
        document.getElementById("gameindicator1").style.backgroundColor = "red"; //turn indicator light red
        playerOrder = []; //clears players order for next game.
        numturn = 0; // resets turn counter to zero for next game.
        turnCounter.innerHTML = "0"+numturn; //changes round display to zero zero
        numflash = 1; //resets flash counter to zerro for 1st round of next game.
        playerGood = true; //resets playerGood to true for new game.
        gameInProgress = false; //will stop the code block that runds the next round from running.
    }

    //call set Cookie method if new highscore.
    if(numturn > highScoreInt){
        setCookie("HighScore", numturn, 30);
        checkCookie();
    }

    //this code will continue the game.
    if(numturn == playerOrder.length && playerGood && gameInProgress){
        numturn++; //move on to the next turn
        playerOrder = []; // reset human players array
        computerTurn = true; // resets too computerTurn
        numflash = 0; //resets which flash we are at
        //Change Turn Count on Display - Display Turn Counter as 01 rathar 1
        if(numturn<10){
        turnCounter.innerHTML = "0"+numturn;         }
        else{
        turnCounter.innerHTML = numturn;
        }

        //Time interval is 1.6 seconds in rounds 1 to 5
        if(numturn<6){
          roundInterval = setInterval(gameRound, 1600);
        }
        //Time interval is 1.4 seconds in rounds 6 to 9
        if(numturn>5){
          roundInterval = setInterval(gameRound, 1400);
        }
        //Time interval is 1.2 second in rounds 10 to 13
        if(numturn>9){
          roundInterval = setInterval(gameRound, 1200);
        }
        //Time interval is 1 seconds in rounds 14+
        if(numturn>13){
          roundInterval = setInterval(gameRound, 1000);
        }
      }
}

//Methods for Storing a High Score with a Cookie

//check for Cookie at start, if no cookie then a cookie with zero will be inserted
//adapted from notes & w3schools
 //if the number of the turn exceeds the high score then the high score cookie is overwritten.
function checkCookie() {
  highScore = getCookie("HighScore");
  if(highScore != ""){
    highScoreInt = parseInt(highScore);
    if(highScoreInt<10){
     HighScoreDisplay.innerHTML = "0"+highScore;
      }
    else{
      HighScoreDisplay.innerHTML = highScore;
      }
    }
  else{
    setCookie("HighScore", 0, 30);
    highScoreInt = 0;
  }
}

//get the Cookie info - direct copy from notes & w3schools
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//setter method for high score - direct copy from notes & w3schools
function setCookie(cname, cvalue, exdays){
  var d = new Date();
  d.setTime(d.getTime()+ (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname+"="+cvalue+";"+expires+";path=/"+";SameSite=none;Secure";
  console.log(document.cookie);
}
