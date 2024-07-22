
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




function promptPlayers() {
    let main = document.querySelector('main');
    main.innerHTML = '';
    let contentPrompt = `   
        <div id="custom-prompt">
            <div class="prompt-content">
                <label for="first-player">Enter name of Player 1:</label>
                <input type="text" id="first-player" class="inputText" required>
            </div>
            <div class="prompt-content">
                <label for="second-player">Enter name of Player 2:</label>
                <input type="text" id="second-player" class="inputText" required>
            </div>
            <button type="submit" id="submit-button">Submit</button>
        </div>
        `;

    main.innerHTML = contentPrompt;

    let buttonPlayerSelector = document.getElementById("submit-button");
    buttonPlayerSelector.addEventListener('click', startGame);
}

function startGame() {
    const inputPlayer1 = document.getElementById("first-player").value;
    const inputPlayer2 = document.getElementById("second-player").value;
    const player1 = createPlayer(inputPlayer1, 'X');
    const player2 = createPlayer(inputPlayer2, 'O');
    let turn = 0;

    // let tictactoe = new Gameboard();

    // tictactoe.checkWin(player1.char, player1.playerName)

    main.innerHTML = '';
    let contentPrompt = `   
            <h1 id="header-game">Tic Tac Toe!</h1>
            <div id="p-information">
                <p class="score player1">${inputPlayer1} Score: 0pts</p>
                <p class="score player2">${inputPlayer2} Score: 0pts</p>
                <p class="last-winner">Player ${inputPlayer1} starts</p>
            </div>
            <section id="gameContainer">
                <div data-index="0" class="container"></div>
                <div data-index="1" class="container"></div>
                <div data-index="2" class="container"></div>
                <div data-index="3" class="container"></div>
                <div data-index="4" class="container"></div>
                <div data-index="5" class="container"></div>
                <div data-index="6" class="container"></div>
                <div data-index="7" class="container"></div>
                <div data-index="8" class="container"></div>
            </section>
    `;
    main.innerHTML = contentPrompt;
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.addEventListener('click', (e) => {
        if (turn === 0) {
            if (e.target.className == "container") {
                if (e.target.textContent === "") {
                    e.target.textContent = player1.char;
                    turn++;
                }

            }

        } else {
            if (e.target.className == "container") {
                if (e.target.textContent === "") {
                    e.target.textContent = player2.char;
                    turn--;
                }
            }
        }

    }) 
}



let main = document.querySelector('main');

let startButton = document.getElementById("start-button");

startButton.addEventListener('click', promptPlayers);
