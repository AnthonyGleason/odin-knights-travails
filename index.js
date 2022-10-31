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
            for (let i=0;i<validMoves.length;i++){
                let tempKnight = new Knight(node, validMoves[i]);
                //if the new node has a location of the endCoord return the node
                if (tempKnight.location[0]==this.endCoord[0] && tempKnight.location[1]==this.endCoord[1]){
                    return tempKnight;
                }
                //add the new knight to the end of the temp queue
                tempQueue.push(tempKnight);
            };
        };
        //recurse sending the temp queue to this.findNode
        return this.findNode(tempQueue);
    };

    findPath(node){
        //while the node != null
        //add location to beggining of temp array
        //step into the parent node
        let pathArray=[];
        while (node!=null){
            pathArray.unshift(node.location);
            node=node.parent;
        };

        //return the path array

        return pathArray;
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
    //check start & end coordinates to avoid script crashes
    if (startCood[0]>7 || endCoord[0]<0) return ["Out of grid error, please enter any number from 0 to 7"];
    if (startCood[1]>7 || endCoord[1]<0) return ["Out of grid error, please enter any number from 0 to 7"];

    //create game board
    let BOARD = new Board(startCood,endCoord);
    //findnode returns the final node with a reference to the root node
    //findpath retraces from the final node back to the root to find the path.
    let path = BOARD.findPath(BOARD.findNode([BOARD.root]));
    //creates message 
    let message = "The fastest path is "
    //add path items to message
    path.forEach((item)=>{
        message=(message+"["+item+"]" +" ");
    });
    console.log(message);
    //log message
    return path;
};

knightMoves([3,1],[4,7]);

