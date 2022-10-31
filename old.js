class Board{
    constructor(startCoord, endCoord){
        this.startCoord=startCoord;
        this.endCoord=endCoord;
        /*The root "knight" will not have a parent this is used as a base case
        later on when tracing the node path.*/
        this.root=new Knight(null, startCoord);
    };

    findNode(queue=[]){
        //create a temp queue
        let tempQueue=[];
        //create a node variable
        let node;
        //loop which emptys queue
        while (queue.length>0){
            //shift node from queue
            node = queue.shift();
            //generate valid moves for the knight location
            let validMoves=node.generateMoves();
            //create a new knight for each move location
            validMoves.forEach((move)=>{
                let tempKnight = new Knight(node, move);
                //if the new node has a location of the endCoord return the node
                if (tempKnight.location[0]==this.endCoord[0] && tempKnight.location[1]==this.endCoord[1]){
                    //EVERYTHING IS WORKING BUT WHERE THE FUCK IS TEMPKNIGHT RETURNED TO
                    console.log(tempKnight);
                    return tempKnight;
                }
                //add the new knight to the end of the temp queue
                tempQueue.push(tempKnight);
            });
        };
        //recurse sending the temp queue to this.findNode
        return this.findNode(tempQueue);
    };

    findPath(node){
        //recieve the ending node from findNode
        //while this.parent != null
        //add location to beggining of temp array
        //step into the parent node

        //return the path array
    }
};

class Knight{
    constructor(parent,location){
        this.parent=parent;
        this.location=location;
    };
    generateMoves(){
        let validMoves=[];

        //Move A
        let moveA = [this.location[0]-2,this.location[1]+1];
        if (this.isMoveValid(moveA)) validMoves.push(moveA);
        //Move B
        let moveB = [this.location[0]-1,this.location[1]+2];
        if (this.isMoveValid(moveB)) validMoves.push(moveB);
        //Move C
        let moveC = [this.location[0]+1,this.location[1]+2];
        if (this.isMoveValid(moveC)) validMoves.push(moveC);
        //Move D
        let moveD = [this.location[0]+2,this.location[1]+1];
        if (this.isMoveValid(moveD)) validMoves.push(moveD);
        //Move E
        let moveE = [this.location[0]+2,this.location[1]-1];
        if (this.isMoveValid(moveE)) validMoves.push(moveE);
        //Move F
        let moveF = [this.location[0]+1,this.location[1]-2];
        if (this.isMoveValid(moveF)) validMoves.push(moveF);
        //Move G
        let moveG = [this.location[0]-1,this.location[1]-2];
        if (this.isMoveValid(moveG)) validMoves.push(moveG);
        //Move H
        let moveH = [this.location[0]-2,this.location[1]-1];
        if (this.isMoveValid(moveH)) validMoves.push(moveH);

        return validMoves;
    };
    isMoveValid(move){
        //Check to see if space is out of bounds x axis
        if (move[0]>7 || move[0]<0) return false;

        //Check to see if space is out of bounds y axis
        if (move[1]>7 || move[1]<0) return false;

        return true;
    }
};

let knightMoves = function (startCood, endCoord){
    //create game board
    let BOARD = new Board(startCood,endCoord);
    //log return value of findNode (which is the ending node with a reference to the root)
    console.log(BOARD.findNode([BOARD.root]));
};

knightMoves([0,0],[5,2]);

