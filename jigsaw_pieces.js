// Her laver vi brikkerne...
class Piece{
    constructor(xPos, yPos, rowIndex, colIndex){
        this.xPos = xPos;
        this.yPos = yPos;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.width = puzzleImage.width / columns * scale;
        this.height = puzzleImage.height / rows * scale;
        this.correctXPos = (canvas.width-puzzleImage.width * scale)/2+this.colIndex * this.width;
        this.correctYPos = (canvas.height-puzzleImage.height * scale)/2+this.rowIndex * this.height+20;
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
    
    isClose() {
        if(Math.sqrt((this.xPos-this.correctXPos)*(this.xPos-this.correctXPos)+(this.yPos-this.correctYPos)*(this.yPos-this.correctYPos)) < this.width/2) {
            return true;
        }
        return false;
    }
    
    snap() {
        this.xPos = this.correctXPos;
        this.yPos = this.correctYPos;
    }
}

function distance() {
    return ;
    }