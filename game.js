buttonColors=["red","blue","green","yellow"];
gamePattern=[];

var started=false;
var level=0;

$(document).on("keydown",function(){
  if(!started){
      nextSequence();
      started=true;
  }
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);

  var n= Math.random();
  var randomNumber=Math.floor(n*4);
  var randomChosenColor=buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);


}


  $(".btn").on("click",function(){

    var userChosenColor=this.id;
    playSound(userChosenColor);
    animatePress(this);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });


function playSound(name){
  var sound=new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColor){
  $(currentColor).addClass("pressed");
  setTimeout(function(){ $(currentColor).removeClass("pressed");},100);
}



function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){ nextSequence()}, 1000);
    }
  }
  else{
    var sound=new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")},200);
    gamePattern=[];
    started=false;
    level=0;
    $("h1").text("Game Over, Press Any Key To Restart");
    
  }
}
