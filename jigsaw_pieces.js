// Her laver vi brikkerne...


class Piece{
    constructor(xPos, yPos, rowIndex, colIndex){
        this.xPos = xPos;
        this.yPos = yPos;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.width = puzzleImage.width / columns;
        this.height = puzzleImage.height / rows;
    }

    draw(){

        ctx.drawImage(
            puzzleImage,
            (puzzleImage.width / columns)* this.colIndex,
            (puzzleImage.height / rows)* this.rowIndex,
            (puzzleImage.width/columns),
            (puzzleImage.height/rows),
            this.xPos,
            this.yPos,
            this.width,
            this.height
        );

    }
}