
//her tegner vi griddet til at placere brikkerne

class Line{
    constructor(startXpos, startYpos, endXpos, endYpos){
        this.startXpos = startXpos;
        this.startYpos = startYpos;
        this.endXpos = endXpos;
        this.endYpos = endYpos;
    }

    draw(){
        /*
        console.log("Draw line from", 
        this.startXpos,
        this.startYpos, "To",
        this.endXpos,
        this.endYpos);
        */

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(this.startXpos, this.startYpos); // from this point (x, y)
        ctx.lineTo(this.endXpos, this.endYpos); // to this point (x, y)
        ctx.stroke(); // draws line
    
    }
}

