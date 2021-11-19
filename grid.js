
//her tegner vi griddet til at placere brikkerne
/*
class Grid{
    constructor(width, height, colums, rows){
        this.width = width;
        this.height = height;
        this.colums = colums;
        this.rows = rows;
    }

    draw(){
        totalWidth = piece.width * columns;
        totalHeight = piece.height * rows;
    }
}
*/
function draw() {

    // set line stroke and line width
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.stroke();

}
draw();