/*----- constants -----*/
const icon = {
    Cross: "/assets/img/cross.svg",
    Circle: "/assets/img/circle.svg"
};

// const gameGrid = document.querySelector('.game-grid');

// const boxOccupiedMsg = `Hullo, ${state.playerTurn} please find an empty cell`;
// const turnMessage = `Hullo, ${state.playerTurn}, your turn`;


 /*----- state variables -----*/
const state = {
    boardState: [null, null, null, null, null, null, null, null, null],
    gameStarted: false,
    gameWon: false,
    turnCount: 0, //to checkWin @ 5 onwards
    playerTurn: "",
    messageBar: "TEST",
};


 /*----- cached elements  -----*/
const selectors = {
    mainDiv: document.getElementById('main') ,
    gameGrid: document.querySelector('.game-grid'),
    messageBar: document.querySelector('.message-bar'),
}

 /*----- event listeners -----*/

 function addEventListeners(){
    selectors.mainDiv.addEventListener('click', evt => {
        if (evt.target.className === "reset-button"){
            console.log("Resetting...");
            resetGame();
        } else {
            console.log(evt.target.id);
            tryCell(evt.target.id);
        };
    });
 }

 /*----- functions -----*/

function advanceTurn(){

    //checkWin();
    
    if (state.playerTurn==="Circle"){
        state.playerTurn = "Cross";
        state.messageBar = "Cross's Turn";
        state.turnCount += 1;
    } else {
        state.playerTurn = "Circle";
        state.messageBar = "Circle's Turn";
        state.turnCount += 1;   
    };

    render();

};

//Check occupancy and commit state
function tryCell(id){

  console.log("Trying cell...")
 
  if (state.boardState[id-1]==="Cross" || state.boardState[id-1]==="Circle" ){
    console.log("cell taken");
    state.messageBar = "Hullo, cell taken"
    renderMessageBar();
  } else {
    //Empty
    console.log("Commiting turn for " + state.playerTurn);
    state.boardState[id-1] = state.playerTurn;

    console.log(state.boardState);
    advanceTurn();
  }
    
}

//Reset state and render.
function resetGame(){
    console.log("Resetting game...");
    state.boardState = [null, null, null, null, null, null, null, null, null],
    state.turnCount = 1;
    state.playerTurn = "Circle";
    state.gameStarted = true;

    state.messageBar = state.playerTurn + "'s Turn"

    renderStart();
}

function renderNewBoardState(){

    console.log("Rendering new board state...");
    //console.log(state.boardState);

    state.boardState.forEach((cellState, index) => {

        if (cellState !== null){

            const cellDiv = document.getElementById(index+1);
            cellDiv.querySelector('img').src = icon[state.boardState[index]];
            
        };
    });

    renderMessageBar();

}

//intialise starting grid programmatically
function renderStart(){
    
    //Clear gameGrid
    selectors.gameGrid.innerHTML="";
    
    for (i=0; i<9; i++){
        let cellDiv = document.createElement('div');
        let cellImg = document.createElement('img');
        cellDiv.appendChild(cellImg);

        cellDiv.className =  "cell";
        cellDiv.id = i+1;
        
        //console.log(cellDiv.id);
        selectors.gameGrid.appendChild(cellDiv);
    }

    renderMessageBar();

}

//Message Bar
function renderMessageBar(){
    console.log(selectors.messageBar.innerText);
    selectors.messageBar.innerText = state.messageBar;
}

function render(){
    //init empty board if boardState is falsy
    if(!state.boardState.length && !state.turnCount){
        renderStart();
    } else {
        renderNewBoardState();
    }
    renderMessageBar();
}

function initialise() {

    resetGame();
    addEventListeners();

}

initialise();