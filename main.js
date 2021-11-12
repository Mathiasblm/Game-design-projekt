
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




let puzzleImage = new Image();
puzzleImage.src = "bugs.jpg";

let mouseIsDown = "false";
let clickedPiece = {};
let mousePosition = {};
let rows = 10;
let columns = 10;
let pieces = [];



puzzelImage.onload = function () {
  //generate the piece objects at random positions
  for(let rowNumber = 0; rowNumber < rows; rowNumber++) {
      for (let columnNumber = 0; columnNumber < columns; columnNumber++) {
          pieces.push(new Piece(
              Math.random()*canvas.width*1, // 0.8
              Math.random()*canvas.height*1, // 0.8
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
          clickedPiece.xPosition = mousePosition.x;
          clickedPiece.yPosition = mousePosition.y;
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
              piece.xPosition < mousePosition.x && 
              piece.yPosition < mousePosition.y &&
              piece.xPosition + piece.width > mousePosition.x &&
              piece.yPosition + piece.height > mousePosition.y
          ) 
          {
              clickedPiece = piece;
          }
      }
      mouseIsDown = true;
  }
});

canvas.addEventListener("mouseup", function (event) {
  mouseIsDown = false;
  clickedPiece = undefined;
});

document.addEventListener("mouseup", function (event) {
  mouseIsDown = false;
  clickedPiece = undefined;
});
