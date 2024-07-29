
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

    return{getBoard, placeValue, printBoard, checkWinner, makeNewGame, finishMakingNewGame}
};

function Cell(){
    let value = 0;

    const addValue = (player) =>{
        value = player;
    }

    const getValue = () => value;

    return{ addValue, getValue};
}

function GameController(playerOneName, playerTwoName){

    let play = 0;
    let winner = 0;

    const board = gameBoard();

    const players = [{name:playerOneName, value:1},{name:playerTwoName, value:2}];

    let activePlayer= players[0];

    const switchPlayerTurn = ()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const createGame =() =>{
        board.makeNewGame();
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                board.placeValue(i,j,0);
            }
        }
        board.finishMakingNewGame();
        play = 0;
    }

    const getWinner = () => winner;

    const removeWinner = () =>{
        winner = 0;
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
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

        
        if(board.checkWinner()===1){
            console.log(`The winner of the game is ${getActivePlayer().name}`);

            winner = getActivePlayer().value +1;

            console.log("Starting a new game!");
            createGame();
        }
        else if(play>8){
            winner = 1;
            console.log("There is no winner, the game is a tie");
            console.log("Starting a new game!");
            createGame();     
        }
        
        if(placement!=0){
            switchPlayerTurn();
            printNewRound();
        }
        
    };

    printNewRound();

    return{
        playRound,
        getActivePlayer,
        getBoard : board.getBoard,
        getWinner,
        removeWinner,
        createGame
    };
}

function ScreenController(){

    let playerOneName = "PlayerOne";
    let playerTwoName = "PlayerTwo";
    const playerOneNameInput = document.querySelector("#player-one-name");
    const playerTwoNameInput = document.querySelector("#player-two-name");
    const namesButton = document.querySelector("#names-button");
    namesButton.addEventListener("click",()=>{
        playerOneName = playerOneNameInput.value;
        playerTwoName = playerTwoNameInput.value;
        playerOneNameInput.value="";
        playerTwoNameInput.value="";
        const playerOneActiveName = document.querySelector(".player-1");
        const playerTwoActiveName = document.querySelector(".player-2");
        playerOneActiveName.textContent = playerOneName;
        playerTwoActiveName.textContent = playerTwoName;
    })

    const game = GameController(playerOneName,playerTwoName);
    const playerDivOne = document.querySelector(".player-one");
    const playerDivTwo = document.querySelector(".player-two")
    const boardDiv = document.querySelector(".board");
    const startButton = document.querySelector(".start");

    const updateScreen = () => {

        boardDiv.textContent="";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        if(activePlayer.value===1){
            playerDivOne.textContent = "X";
            playerDivTwo.textContent = "";
            playerDivOne.classList.add("activeStyle");
            playerDivTwo.classList.remove("activeStyle");
        }
        else{
            playerDivOne.textContent = "";
            playerDivTwo.textContent = "O";
            playerDivTwo.classList.add("activeStyle");
            playerDivOne.classList.remove("activeStyle");
        }
        

        board.forEach((row, r_index)=>{
            row.forEach((cell, c_index)=>{

                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = r_index;
                cellButton.dataset.column = c_index;
                if(cell.getValue()===0){
                    cellButton.textContent = "";
                }
                else if(cell.getValue()===1){
                    cellButton.textContent = "X";
                }
                else{
                    cellButton.textContent = "O";
                }
                

                boardDiv.appendChild(cellButton);
            })
        })
    }

    const dialogOperator=(passage)=>{
        const dialog = document.querySelector("dialog");
        const closeDialogButton = document.querySelector(".close-dialog"); 
        dialog.showModal();
        const h1 = document.querySelector(".dialog-passage");
        h1.textContent=passage;
        closeDialogButton.addEventListener("click", ()=>{
            dialog.close();
        })
    }

    function clickBoard(e){
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if(!selectedColumn || !selectedRow){
            return;
        }

        game.playRound(selectedRow, selectedColumn);

        if(game.getWinner()===1){
            dialogOperator("The game is a tie");
            // alert("The game is a tie");
            game.removeWinner();
        }
        else if(game.getWinner()===2){
            dialogOperator(`The winner of the game is ${playerOneName}`);
            game.removeWinner();
        }
        else if(game.getWinner()===3){
            dialogOperator(`The winner of the game is ${playerTwoName}`);
            game.removeWinner();
        }
        updateScreen();
    }

    function startNewGame(){
        game.createGame();
        updateScreen();
    }

    startButton.addEventListener("click", startNewGame);
    boardDiv.addEventListener("click", clickBoard);
    updateScreen();

}

ScreenController();

// const game = GameController("Antonio", "Orlando");