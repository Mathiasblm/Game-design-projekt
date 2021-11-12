
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




let puzzleImage = new Image();
puzzleImage.src = "bugs.jpg";

let mouseIsDown = "false";
let clickedPiece = {};
let xOffset = 0;
let yOffset = 0;
let mousePosition = {};
let rows = 3;
let columns = 3;
let pieces = [];



puzzleImage.onload = function () {
  //generate the piece objects at random positions
  for(let rowNumber = 0; rowNumber < rows; rowNumber++) {
      for (let columnNumber = 0; columnNumber < columns; columnNumber++) {
          pieces.push(new Piece(
            Math.random()*(canvas.width-puzzleImage.width / columns),
            Math.random()*(canvas.height-puzzleImage.height / columns),
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
          clickedPiece.xPos = mousePosition.x - xOffset; //Det er her den er gal når man klikker på en brik
          clickedPiece.yPos = mousePosition.y - yOffset;
      }

  }, 1000/60);
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
canvas.addEventListener("mousedown", function (event) {
  

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
      console.log("MouseDown = true");
  }
});

canvas.addEventListener("mouseup", function (event) {
  mouseIsDown = false;
  console.log("MouseDown = False");
  clickedPiece = undefined;
});

document.addEventListener("mouseup", function (event) {
  mouseIsDown = false;
  clickedPiece = undefined;
});
