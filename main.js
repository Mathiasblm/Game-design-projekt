
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




let puzzleImage = new Image();
puzzleImage.src = "boat.png";

let scale = 1;
let mouseIsDown = "false";
let clickedPiece = {};
let xOffset = 0;
let yOffset = 0;
let mousePosition = {};
let rows = 3;
let columns = 3;
let pieces = [];




puzzleImage.onload = function () {

  // virker kun med kvadratiske billeder
  scale = 500/puzzleImage.width;

  //generate the piece objects at random positions
  for(let rowNumber = 0; rowNumber < rows; rowNumber++) {
      for (let columnNumber = 0; columnNumber < columns; columnNumber++) {
          pieces.push(new Piece(
            Math.random()*(canvas.width-puzzleImage.width / columns * scale),
            Math.random()*(canvas.height-puzzleImage.height / columns * scale),
              rowNumber,
              columnNumber)
          );
      }
  }

  // draw the pieces 60 times per second
  setInterval(function() {

      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let piece of pieces)
          piece.draw();

      if(clickedPiece != undefined) {
          clickedPiece.xPos = clamp(mousePosition.x - xOffset, 0, canvas.width-clickedPiece.width); //Det er her den er gal når man klikker på en brik
          clickedPiece.yPos = clamp(mousePosition.y - yOffset, 0, canvas.height-clickedPiece.height);
      }
      

  }, 1000/100);
}
/*
function clamp(){
  let minWidth = 0;
  let minHeight = 0;
  let maxWidth = canvas.width - clickedPiece.width;
  let maxHeight = canvas.height - clickedPiece.height;

  if(clickedPiece.xPos <= minWidth){
    clickedPiece.xPos = minWidth;
  }
  if(clickedPiece.yPos <= minHeight){
    clickedPiece.yPos = minHeight;
  }
  if(clickedPiece.xPos >= maxWidth){
    clickedPiece.xPos = maxWidth
  }
  if(clickedPiece.yPos >= maxHeight){
    clickedPiece.yPos = maxHeight;
  }
}
*/
// logik som ovenfor
function clamp(value, min, max){

  if(value <= min){
    value = min;
  }
  if(value >= max){
    value = max;
  }

  return value;
  
}

// update the mouse position
canvas.addEventListener("mousemove", function (event) {
  var rect = canvas.getBoundingClientRect();
  mousePosition = {
    x: event.clientX - rect.left, // account for border size
    y: event.clientY - rect.top
  };
});

// 
canvas.addEventListener("mousedown", function () {
  

  if(!mouseIsDown) {
      for(let piece of pieces) {
          if(
              piece.xPos < mousePosition.x && 
              piece.yPos < mousePosition.y &&
              piece.xPos + piece.width > mousePosition.x &&
              piece.yPos + piece.height > mousePosition.y
          ) 
          {
              clickedPiece = piece;
              xOffset = mousePosition.x - piece.xPos;
              yOffset = mousePosition.y - piece.yPos;
          }
      }
      mouseIsDown = true;
      
  }
});

canvas.addEventListener("mouseup", function () {
  mouseIsDown = false;
  
  clickedPiece = undefined;
});

document.addEventListener("mouseup", function () {
  mouseIsDown = false;
  clickedPiece = undefined;
});
