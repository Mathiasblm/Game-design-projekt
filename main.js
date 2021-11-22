
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
let rows = 8;
let columns = 8;
let pieces = [];
// line variables
let lines = [];






puzzleImage.onload = function () {

  // virker kun med kvadratiske billeder
  scale = 500/puzzleImage.width;
  // line variables
  let pieceWidth = puzzleImage.width/columns * scale;
  let pieceHeight = puzzleImage.height/rows * scale;
  let imageX = (canvas.width-puzzleImage.width * scale)/2;
  let imageY = (canvas.height-puzzleImage.height * scale)/2;

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

    // vertical lines
    for (let i = 0; i <= columns; i++){
      lines.push(new Line(
          imageX + (pieceWidth * i),
          imageY,
          imageX + (pieceWidth * i),
          imageY + puzzleImage.height * scale
      ));

    }

    // Horizontal lines
    for (let i = 0; i <= rows; i++){
      lines.push(new Line(
          imageX,
          imageY + (pieceHeight * i),
          imageX + puzzleImage.width * scale,
          imageY + (pieceHeight * i)
      ));

    }
  }

  // draw the pieces 60 times per second
  setInterval(function() {
      ctx.clearRect(0,0,canvas.width,canvas.height);

      // draw grid

      for (let line of lines){
        line.draw();
      }

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
      for(let i=0; i < pieces.length; i++) {
          if(
              pieces[i].xPos < mousePosition.x && 
              pieces[i].yPos < mousePosition.y &&
              pieces[i].xPos + pieces[i].width > mousePosition.x &&
              pieces[i].yPos + pieces[i].height > mousePosition.y) 
          {
              clickedPiece = pieces[i];
              
              pieces.splice(i,1)
              pieces.push(clickedPiece)
              
              xOffset = mousePosition.x - pieces[i].xPos;
              yOffset = mousePosition.y - pieces[i].yPos;
          }
      }
      mouseIsDown = true;
  }
});

canvas.addEventListener("mouseup", function () {
  mouseIsDown = false;
  clickedPiece = undefined;
});
