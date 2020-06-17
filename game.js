// Anykey that has been pressed on the keyboard

var level = 0;
var started = false;
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
    $("h1").text("Level " + level);

  }
});


var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
 console.log(userClickedPattern);
  animatePress(userChosenColour);
  playSound(userChosenColour);
   checkAnswer(userClickedPattern.length);
})

function checkAnswer(len){
  len-=1;
  if(userClickedPattern[len]==gamePattern[len])
  {
    console.log("yee");

  if(gamePattern.length==userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);

    userClickedPattern=[];
  }

}
else{
  console.log("fail");
  var audio1=new Audio("sounds/wrong.mp3");
  audio1.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");

  },200);
  $("h1").text("Game over Loser, Press any key to start");
  startOver();
}
}

function startOver()
{
  gamePattern=[];
  userClickedPattern=[];
  started=false;
  level=0;

}

function nextSequence() {
  // Increasing the level each time function is called
  level++;
  $("h1").text("Level " + level);
  var randomNo1 = Math.random();
  randomNo1 *= 4;
  randomNo1 = Math.floor(randomNo1);
  //  console.log(randomNo1);
  var randomChosenColor = buttonColors[randomNo1];
  //console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  //console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //selecting the button as the same button that has been chosen;
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}

// For Playing sounds on mouse click
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// For creating animations for button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");

  }, 100);
}
