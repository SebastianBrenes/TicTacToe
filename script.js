
const Gameboard = function () {
    this.board = 
    ['', '', '',
     '', '', '',
     '', '', ''];

    this.checkWin = function (char, name) {
        const winCombinations = [
            // row winning
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // column winning
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8],

            // diagonal winning
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        for (const winCombo of winCombinations) {
            const [a, b, c] = winCombo;
            if (this.board[a] === char && this.board[b] === char && this.board[c] === char) {
                console.log(this.board);
                console.log('You won ' + name + '!');
            }
            
        }
    }
} 



function createPlayer (name, char) {
    const playerName = name;
    let score = 0;

    const getScore = () => score;
    const addScore = () => score++;

    return { playerName, char, getScore, addScore };
}

// const player1 = createPlayer("Juancito", 'x');
// const player2 = createPlayer("Jacinto", 'O');

// let tictactoe = new Gameboard();

// tictactoe.checkWin(player1.char, player1.playerName)


function promptPlayers() {
    let main = document.querySelector('main');
    main.innerHTML = '';
    let contentPrompt = `   
        <div id="custom-prompt">
            <div class="prompt-content">
                <label for="first-player">Enter name of Player 1:</label>
                <input type="text" id="first-player" class="inputText">
            </div>
            <div class="prompt-content">
                <label for="second-player">Enter name of Player 2:</label>
                <input type="text" id="second-player" class="inputText">
            </div>
            <button id="submit-button">Submit</button>
        </div>
        `;

    main.innerHTML = contentPrompt;

    let buttonPlayerSelector = document.getElementById("submit-button");
    buttonPlayerSelector.addEventListener('click', startGame);
}

function startGame() {
    const inputPlayer1 = document.getElementById("first-player").value;
    const inputPlayer2 = document.getElementById("second-player").value;
    main.innerHTML = '';
    console.log('Player 1:', inputPlayer1);
    console.log('Player 2:', inputPlayer2);
}

let main = document.querySelector('main');

let startButton = document.getElementById("start-button");

startButton.addEventListener('click', promptPlayers);
