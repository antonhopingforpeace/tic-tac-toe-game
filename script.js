
function gameBoard(){

    const rows = 3;
    const columns = 3;
    const board = [];
    //Useful when i want to create a new game
    newGame=false;

    for(let i=0;i<rows;i++){
        board[i] = [];
        for(let j=0;j<columns;j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    //Useful when i want to create a new game
    const makeNewGame = () => {
        newGame = true; 
    };

    const finishMakingNewGame = () =>{
        newGame = false;
    };
    
    const placeValue = (row, column, player) => {

        if(board[row][column].getValue()!=0 && !newGame)
            return 0;
        else{   
            board[row][column].addValue(player);
            return 1;
        }
        // board[row][column].addValue(player);
    }

    const printBoard = () =>{
        const boardWithCellValues = board.map((row)=> row.map((cell)=> cell.getValue()));
        console.log(boardWithCellValues);
    }

    const checkWinner = () => {
        if(board[0][0].getValue()===board[0][1].getValue() && board[0][0].getValue() === board [0][2].getValue() && board[0][0].getValue()!== 0){
            return 1;
        }
        else if(board[1][0].getValue()===board[1][1].getValue() && board[1][0].getValue() === board [1][2].getValue() && board[1][0].getValue()!== 0){
            return 1;
        }
        else if(board[2][0].getValue()===board[2][1].getValue() && board[2][0].getValue() === board [2][2].getValue() && board[2][0].getValue()!== 0){
            return 1;
        }
        else if(board[0][0].getValue()===board[1][0].getValue() && board[0][0].getValue() === board [2][0].getValue() && board[0][0].getValue()!== 0){
            return 1;
        }
        else if(board[0][1].getValue()===board[1][1].getValue() && board[0][1].getValue() === board [2][1].getValue() && board[0][1].getValue()!== 0){
            return 1;
        }
        else if(board[0][2].getValue()===board[1][2].getValue() && board[0][2].getValue() === board [2][2].getValue() && board[0][2].getValue()!== 0){
            return 1;
        }
        else if(board[0][0].getValue()===board[1][1].getValue() && board[0][0].getValue() === board [2][2].getValue() && board[0][0].getValue()!== 0){
            return 1;
        }
        else if(board[0][2].getValue()===board[1][1].getValue() && board[0][2].getValue() === board [2][0].getValue() && board[0][2].getValue()!== 0){
            return 1;
        }
        else
            return; 
}

    return{getBoard, placeValue, printBoard, checkWinner,makeNewGame,finishMakingNewGame}
};

function Cell(){
    let value = 0;

    const addValue = (player) =>{
        value = player;
    }

    const getValue = () => value;

    return{ addValue, getValue};
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two"){

    let play = 0;

    const board = gameBoard();

    const players = [{name:playerOneName, value:1},{name:playerTwoName, value:2}];

    let activePlayer= players[0];

    const switchPlayerTurn = ()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, column) => {

        if(row>3||column>3){
            return;
        }

        play++;

        console.log(`Placing ${getActivePlayer().name}'s choice into row ${row}, column ${column}`);
        
        let placement = board.placeValue(row,column,getActivePlayer().value);
        
        if(placement===0){
            console.log("This place already has a value");
            play--;
           }

        if(play>8){
            console.log("There is no winner, the game is a tie");
            console.log("Starting a new game!");
            board.makeNewGame();
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    board.placeValue(i,j,0);
                }
            }
            board.finishMakingNewGame();
            play = 0;
            
        }
        else if(board.checkWinner()===1){
            console.log(`The winner of the game is ${getActivePlayer().name}`);
            console.log("Starting a new game!");
            board.makeNewGame();
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){

                    board.placeValue(i,j,0);
                    alert(board.placeValue(i,j,0));
                }
            }
            play = 0;
            board.finishMakingNewGame();
        }
        if(placement!=0){
            switchPlayerTurn();
            printNewRound();
        }
        
    };

    printNewRound();

    return{
        playRound,
        getActivePlayer
    };
}

const game = GameController();