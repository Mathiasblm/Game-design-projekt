// Her laver vi brikkerne...
class Piece{
    constructor(xPos, yPos, rowIndex, colIndex){
        this.xPos = xPos; // General x position
        this.yPos = yPos; // General y position
        this.rowIndex = rowIndex; // row id
        this.colIndex = colIndex; // column id
        this.width = puzzleImage.width / columns * scale; // width
        this.height = puzzleImage.height / rows * scale; // height
        this.correctXPos = (canvas.width-puzzleImage.width * scale)/2+this.colIndex * this.width; // Solved x position
        this.correctYPos = (canvas.height-puzzleImage.height * scale)/2+this.rowIndex * this.height+20; // Solved y position
    }

    // Draws piece
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
    // Calculates pieces position relevant to solved position for given piece
    isClose() {
        if(Math.sqrt((this.xPos-this.correctXPos)*(this.xPos-this.correctXPos)+(this.yPos-this.correctYPos)*(this.yPos-this.correctYPos)) < this.width/2) {
            return true;
        }
        return false;
    }
    // Sets piece position to solved position
    snap() {
        this.xPos = this.correctXPos;
        this.yPos = this.correctYPos;
    }
}

