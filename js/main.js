//Heavily inspired by memory-card-game given reference by GA for the pattern used.
// https://git.generalassemb.ly/sei-sg/SEIF-15-Course-Materials/tree/main/unit1/w04d3/sample-memory-card-game

/*----- constants -----*/


/*----- state variables -----*/
// const state = {
//     gameStarted: false,
//     gameWon: false,
//     difficulty: "easy", // easy, medium or hard
//     flippedCards: 0, // 0, 1 or 2
//     totalFlips: 0,
//     totalTime: 0,
// }



/*
Sample card object:
{
    index, 0,
    emoji: 🥔,
    flipped: false,
    matched: false,
}
*/
let boardState = [];

 /*----- cached elements  -----*/
//  const selectors = {
//     board: document.querySelector('.board'),
//     timer: document.querySelector('#timer-second-number'),
//     moves: document.querySelector('#move-number'),
//     start: document.querySelector('.start'),
//     difficulty: document.querySelector('.difficulty'),
//     win: document.querySelector('.win'),
//  }


 /*----- event listeners -----*/
// function addEventListeners() {
//     document.addEventListener('click', event => {
//         const eventTarget = event.target;
//         const eventParent = eventTarget.parentElement;

//         if (eventTarget.className.includes('card-front') && !eventParent.className.includes('flipped')) {
//             handleFlipCard(eventParent.getAttribute('card-index'));
//             renderNewBoardState();
//         } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.hasAttribute('disabled')) {
//             startGame();
//         } 
//     });

//     document.addEventListener('change', event => {
//         const eventTarget = event.target;

//         if (eventTarget.nodeName === 'SELECT' && !state.gameStarted) {
//             state.difficulty = eventTarget.value;
//             generateInitialBoardState();
//             renderInitialBoard();
//         }
//     });
// }


 /*----- functions -----*/
 // Helper utility functions
//  const shuffle = (array) => {
//     const clonedArray = [...array];

//     for (let index = clonedArray.length - 1; index > 0; index--) {
//         const randomIndex = Math.floor(Math.random() * (index + 1));
//         const original = clonedArray[index];

//         clonedArray[index] = clonedArray[randomIndex];
//         clonedArray[randomIndex] = original;
//     }

//     return clonedArray;
// }

// const pickRandom = (array, items) => {
//     const clonedArray = [...array];
//     const randomPicks = [];

//     for (let index = 0; index < items; index++) {
//         const randomIndex = Math.floor(Math.random() * clonedArray.length);
        
//         randomPicks.push(clonedArray[randomIndex]);
//         clonedArray.splice(randomIndex, 1);
//     }

//     return randomPicks;
// }

// Logic functions
// function startGame() {
//     if (state.gameWon) {
//         // Reset if restarting on victory.
//         state.flippedCards = 0;
//         state.totalFlips = 0;
//         state.totalTime = 0;
        
//         generateInitialBoardState();
//         renderInitialBoard();

//         state.gameWon = false;
//     }

//     state.gameStarted = true;

//     render();

//     // Start the timer.
//     // This timer implementation works but its not ideal since its not called exactly every 1000ms.
//     // use requestAnimationFrame?
//     state.loop = setInterval(() => {
//         state.totalTime += 1;
//         selectors.timer.innerText = state.totalTime;
//     }, 1000);
}

function handleFlipCard(cardIndex) {
    // if (!state.gameStarted) {
    //     startGame();
    // }

    // state.flippedCards += 1;
    // state.totalFlips += 1;

    // if (state.flippedCards <= 2) {
    //     boardState[cardIndex].flipped = true;
    // }

    // if (state.flippedCards === 2) {
    //     const flippedCards = boardState.filter(x => x.flipped && !x.matched);

    //     if (flippedCards[0].emoji === flippedCards[1].emoji) {
    //         flippedCards[0].matched = true;
    //         flippedCards[1].matched = true;
    //         state.flippedCards = 0;
    //     } else {
    //         // Flip back pair of matching cards.
    //         setTimeout(() => {
    //             state.flippedCards = 0;
    //             flippedCards[0].flipped = false;
    //             flippedCards[1].flipped = false;
    //             render();
    //         }, 1000);
    //     }

    //     checkWin();
    // }

    // render();
}

function checkWin() {
    // If there are no more cards that we can flip, we won the game
//     const unmatchedCards = boardState.filter(x => !x.matched);
//     if (unmatchedCards.length === 0) {
//         setTimeout(() => {
//             clearInterval(state.loop);

//             //reactivate buttons, opposite of startGame
//             state.gameStarted = false;
//             state.gameWon = true;

//             render();

//         }, 1000);
//     }
// }

// function createCard(emoji, cardIndex) {
//     const cardDiv = document.createElement('div');
//     cardDiv.classList.add('card');
//     cardDiv.setAttribute('card-index', cardIndex);

//     const cardFrontDiv = document.createElement('div');
//     cardFrontDiv.classList.add('card-front');
//     const cardBackDiv = document.createElement('div');
//     cardBackDiv.classList.add('card-back');

//     cardBackDiv.innerText = emoji;

//     cardDiv.append(cardFrontDiv, cardBackDiv);


//     if (state.difficulty === 'easy') {
//         cardDiv.classList.add('easy');
//         cardBackDiv.classList.add('easy');
//     }

//     return cardDiv;
// }

function generateInitialBoardState() {
    const dimensions = dimensionsMap[state.difficulty] || dimensionsMap.easy;

    const picks = pickRandom(possibleEmojis, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks]);

    boardState = items.map((x, index) => ({
        index: index,
        emoji: x,
        flipped: false,
        matched: false,
    }));
}

// Board render functions
function renderInitialBoard () {
    const dimensions = dimensionsMap[state.difficulty] || dimensionsMap.easy;

    //cleanup in case of restart, such as difficulty change or new game
    selectors.board.innerHTML = '';

    boardState.forEach((item, index) => {
        const cardEl = createCard(item.emoji, index, state.difficulty);

        selectors.board.appendChild(cardEl);
    });
       
    selectors.board.style.gridTemplateColumns = `repeat(${dimensions}, auto)`;
}

// function renderNewBoardState() {
//     const allCards = document.querySelectorAll('.card');

//     allCards.forEach(element => {
//         const cardData = boardState[element.getAttribute('card-index')];

//         if (cardData.flipped) {
//             element.classList.add('flipped');
//         } else {
//             element.classList.remove('flipped');
//         }

//         if (cardData.matched) {
//             element.classList.add('matched');
//         } else {
//             element.classList.remove('matched');
//         }
//     });
// }

// function renderMoves() {
//     selectors.moves.innerText = state.totalFlips;
// }

// function renderDifficultySelect() {
//     Object.keys(dimensionsMap).forEach((difficulty) => {
//         const optionEl = document.createElement('option');

//         optionEl.setAttribute('value', difficulty);
//         optionEl.innerText = difficulty;
        
//         selectors.difficulty.appendChild(optionEl);
//     });
// }

// function renderStart() {
//     /*
//         To set the value of a Boolean attribute, such as disabled, you can specify any value.
//         An empty string or the name of the attribute are recommended values.
//         All that matters is that if the attribute is present at all, regardless of its actual value,
//         its value is considered to be true.
//     */
//         selectors.start.setAttribute('disabled', '');
//         selectors.difficulty.setAttribute('disabled', '');
//         selectors.start.innerText = 'Game Started';
// }

// function renderGameWon() {
//     if (state.gameWon) {
//         confetti();

//         setTimeout(() => {
//             confetti.reset();
//         }, 3000);
//         selectors.win.style.visibility = 'visible';
//         selectors.win.innerHTML = `
//             <span class="win-text">
//                 You won!<br />
//                 with <span class="highlight">${state.totalFlips}</span> moves<br />
//                 under <span class="highlight">${state.totalTime}</span> seconds
//             </span>
//         `;

//         selectors.start.removeAttribute('disabled');
//         selectors.difficulty.removeAttribute('disabled');
//         selectors.start.innerText = 'Restart';
//     } else {
//         selectors.win.innerHTML = '';
//         selectors.win.style.visibility = 'hidden';
//     }

// }

// function render() {
//     renderStart();
//     renderGameWon();
//     renderNewBoardState();
//     renderMoves();
// }

// // Initialize function
function initialize() {
    // renderDifficultySelect();
    generateInitialBoardState();
    renderInitialBoard();
    // addEventListeners();
}


initialize();