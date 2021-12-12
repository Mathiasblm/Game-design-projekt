let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let puzzleImage = new Image(); // imports image to JavasScript
puzzleImage.src = "boat.png";

// Variables
let scale = 1;
let mouseIsDown = "false";
let clickedPiece = {};
let xOffset = 0;
let yOffset = 0;
let mousePosition = {};
let rows = 3;
let columns = 3;
let pieces = [];
// line variables
let lines = [];

// Game start
puzzleImage.onload = function () {

  // virker kun med kvadratiske billeder
  scale = 500/puzzleImage.width;
    
  // line variables
  let pieceWidth = puzzleImage.width/columns * scale;
  let pieceHeight = puzzleImage.height/rows * scale;
  let imageX = (canvas.width-puzzleImage.width * scale)/2;
  let imageY = (canvas.height-puzzleImage.height * scale)/2+20;

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

  // draw the pieces 60 times per second (Game loop)
  setInterval(function() {
      completed(pieces) // Checks if puzzle is solved
      ctx.clearRect(0,0,canvas.width,canvas.height); // Clears canvas

      // draw grid
      for(let line of lines) {
        line.draw();
      }
      // draw pieces
      for(let piece of pieces)
          piece.draw();
      
      // Let's you drag the piece from any position on the piece
      if(clickedPiece != undefined) {
          clickedPiece.xPos = clamp(mousePosition.x - xOffset, 0, canvas.width-clickedPiece.width); 
          clickedPiece.yPos = clamp(mousePosition.y - yOffset, 0, canvas.height-clickedPiece.height);
          // Offset er forskellen mellem brikken og musen
          // så tjekker clamp om musen er på brikken
          // hvis den er det så....
      }
  }, 1000/100);
}

// clamps values
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

// Event listener that checks if you have clicked the mouse down
// if yes, then checks if check if mouse position has shares at position with a piece
// then moves that piece foward, so it slides over other pieces
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
// Event listener that checks if you don't click the mouse anymore
// then check if a piece position is close to it's solved position
// then lets piece position be it's solved position
canvas.addEventListener("mouseup", function () {
    
    if(pieces[pieces.length-1].isClose() == true) {
        pieces[pieces.length-1].snap()
    }

    mouseIsDown = false;
    clickedPiece = undefined;
});


// completes the puzzle
/*
function complete() {
    for(let i = 0; i < pieces.length; i++) {
        pieces[i].xPos = pieces[i].correctXPos
        pieces[i].yPos = pieces[i].correctYPos
    }
};
*/


// checks if puzzle is completed
function completed() {
    for(let i = 0; i < pieces.length; i++) {
        if(pieces[i].xPos !== pieces[i].correctXPos || pieces[i].yPos !== pieces[i].correctYPos) {
            return false
        }
    }
    alert("congratulations")
    return true
}