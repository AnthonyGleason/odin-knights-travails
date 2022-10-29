class gameBoard {
    constructor(startCoord, endCoord){
        this.startCoord=this.subCord(startCoord);
        this.endCoord=this.subCord(endCoord);
        this.gameBoardData=this.createGameBoard();
        this.validMoves=[];
    };
    createGameBoard(){
        let tempGameBoard = [];

        //Create the 8 rows of the chessboard
        for (let i=0;i<8;i++){
            tempGameBoard.push([]);
        };

        //Create the 8 columns of the chessboard
        tempGameBoard.forEach((row)=>{
            for (let i=0;i<8;i++){
                row.push("*");
            };
        }); 
        
        //Set the knight piece
        tempGameBoard[this.startCoord[0]][this.startCoord[1]]="K";

        //set the ending location
        tempGameBoard[this.endCoord[0]][this.endCoord[1]]="E";

        return tempGameBoard;
    };
    generateMoves(move){
        this.validMoves=[];
        let tempMoves=[];
        //test all 8 possible locations
        
        //Move A
        let moveA = [move[0]-2,move[1]+1];
        tempMoves.push(moveA);
        //Move B
        let moveB = [move[0]-1,move[1]+2];
        tempMoves.push(moveB);
        //Move C
        let moveC = [move[0]+1,move[1]+2];
        tempMoves.push(moveC);
        //Move D
        let moveD = [move[0]+2,move[1]+1];
        tempMoves.push(moveD);
        //Move E
        let moveE = [move[0]+2,move[1]-1];
        tempMoves.push(moveE);
        //Move F
        let moveF = [move[0]+1,move[1]-2];
        tempMoves.push(moveF);
        //Move G
        let moveG = [move[0]-1,move[1]-2];
        tempMoves.push(moveG);
        //Move H
        let moveH = [move[0]-2,move[1]-1];
        tempMoves.push(moveE);

        //push valid moves
        tempMoves.forEach((move)=>{
            if (this.moveValid(move)){
                this.validMoves.push(move);
            }
        })
    };
    moveValid(move, path=[]){
        console.log(path);
        //see if move is already in path
        if (path.includes(move)){
            return false;
        }
        //check for out of bounds x axis
        if (move[0]>7 || move[0]<0){
            return false;
        }
        //Check for out of bounds y axis
        else if (move[1]>7 || move[1]<0){
            return false;
        }
        //return false if the move is the starting point to prevent endless loop
        else if (move[0]==this.startCoord[0] && move[1]==this.startCoord[1]){
            return false;
        }
        //move is valid if the above conditions are not detected
        else{
            return true;
        }
    };
    printBoard(){
        //print to console in reverse to account for how data is stored in the game board
        for(let i=this.gameBoardData.length-1; i>=0;i--){
            console.log(this.gameBoardData[i]);
        }
    };
    recurse(move, path=[]){
        //Base case to check to see if the move is the ending coordinate
        if (move[0]==this.endCoord[0] && move[1]==this.endCoord[1]) return path;
        path.push(move);
        
        //generate moves
        this.generateMoves(move);
        
        console.log(path);
        //recurse
        this.validMoves.forEach((move)=>{
            this.recurse(move, path);
        }); 
        return path;
    };
    //Subtract 1 from the moves to account for array
    subCord(coord){
        return [coord[0]-1,coord[1]-1];
    };
};

let knightMoves = function (startCoord, endCoord){
    let GAMEBOARD = new gameBoard(startCoord, endCoord);
    return GAMEBOARD.recurse(GAMEBOARD.startCoord);
};

console.log(knightMoves([1,1],[4,5]));