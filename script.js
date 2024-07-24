
const Gameboard = function () {
    this.board = 
    ['', '', '',
     '', '', '',
     '', '', ''];

    this.resetBoard = function () {
        this.board = 
    ['', '', '',
     '', '', '',
     '', '', ''];
    }


    this.checkWin = function (char) {
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
                return true;
            }
            
        }
        return false;
    }

    this.checkDraw = function (char1, char2) {
        let draw = 0;
        for (const chars of this.board) {
            if (chars != '') {
                draw++;
            }
        }
        console.log('sali del bucle de draw');
        if (draw === 9 && this.checkWin(char1) == false && this.checkWin(char2) == false) {
           this.resetBoard();
           return true;
        }

        return false;
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
                <input type="text" id="first-player" class="inputText" value="Player 1" required>
            </div>
            <div class="prompt-content">
                <label for="second-player">Enter name of Player 2:</label>
                <input type="text" id="second-player" class="inputText" value="Player 2" required>
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
    let tictactoe = new Gameboard();

    main.innerHTML = '';
    let contentPrompt = `   
            <h1 id="header-game">Tic Tac Toe!</h1>
            <div id="p-information">
                <p class="score player1">${player1.playerName} - Score: ${player1.getScore()}pts</p>
                <p class="score player2">${player2.playerName} - Score: ${player2.getScore()}pts</p>
                <p class="last-winner">Player ${player1.playerName} starts</p>
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
    // target.dataset.index
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (turn === 0) {
            if (target.className == "container") {
                if (target.textContent === "") {
                    target.textContent = player1.char;
                    turn++;
                    tictactoe.board[parseInt(target.dataset.index)] = player1.char
                    let check = tictactoe.checkWin(player1.char)
                    console.log(tictactoe.board);
                    console.log(check);
                    if (tictactoe.checkDraw(player1.char, player2.char) == true) {
                        let lastWinner = document.querySelector('.last-winner');
                        lastWinner.textContent = `Its a Draw!`;
                        gameContainer.innerHTML = `
                            <div data-index="0" class="container"></div>
                            <div data-index="1" class="container"></div>
                            <div data-index="2" class="container"></div>
                            <div data-index="3" class="container"></div>
                            <div data-index="4" class="container"></div>
                            <div data-index="5" class="container"></div>
                            <div data-index="6" class="container"></div>
                            <div data-index="7" class="container"></div>
                            <div data-index="8" class="container"></div>
                        `;
                        turn = 0;
                    }
                    if (check) {
                        turn = 0;
                        let lastWinner = document.querySelector('.last-winner');
                        let scorePlayer1 = document.querySelector('.score.player1');
                        player1.addScore();
                        scorePlayer1.textContent = `${player1.playerName} - Score: ${player1.getScore()}pts`;
                        lastWinner.textContent = `You won ${player1.playerName}!`;
                        gameContainer.innerHTML = `
                            <div data-index="0" class="container"></div>
                            <div data-index="1" class="container"></div>
                            <div data-index="2" class="container"></div>
                            <div data-index="3" class="container"></div>
                            <div data-index="4" class="container"></div>
                            <div data-index="5" class="container"></div>
                            <div data-index="6" class="container"></div>
                            <div data-index="7" class="container"></div>
                            <div data-index="8" class="container"></div>
                        `;
                        tictactoe.resetBoard();
                    }
                }

            }

        } else {
            if (target.className == "container") {
                if (target.textContent === "") {
                    target.textContent = player2.char;
                    turn--;
                    tictactoe.board[parseInt(target.dataset.index)] = player2.char;
                    let check = tictactoe.checkWin(player2.char);
                    console.log(tictactoe.board);
                    console.log(check);
                    if (tictactoe.checkDraw(player1.char, player2.char) == true) {
                        let lastWinner = document.querySelector('.last-winner');
                        lastWinner.textContent = `Its a Draw!`;
                        gameContainer.innerHTML = `
                            <div data-index="0" class="container"></div>
                            <div data-index="1" class="container"></div>
                            <div data-index="2" class="container"></div>
                            <div data-index="3" class="container"></div>
                            <div data-index="4" class="container"></div>
                            <div data-index="5" class="container"></div>
                            <div data-index="6" class="container"></div>
                            <div data-index="7" class="container"></div>
                            <div data-index="8" class="container"></div>
                        `;
                        turn = 0;
                    }
                    if (check) {
                        turn = 0;
                        let lastWinner = document.querySelector('.last-winner');
                        let scorePlayer2 = document.querySelector('.score.player2');
                        player2.addScore();
                        scorePlayer2.textContent = `${player2.playerName} - Score: ${player2.getScore()}pts`;
                        lastWinner.textContent = `You won ${player2.playerName}!`;
                        gameContainer.innerHTML = `
                        <div data-index="0" class="container"></div>
                        <div data-index="1" class="container"></div>
                        <div data-index="2" class="container"></div>
                        <div data-index="3" class="container"></div>
                        <div data-index="4" class="container"></div>
                        <div data-index="5" class="container"></div>
                        <div data-index="6" class="container"></div>
                        <div data-index="7" class="container"></div>
                        <div data-index="8" class="container"></div>
                        `;
                        tictactoe.resetBoard();
                    }
                }
            }
        }

    }) 
}



let main = document.querySelector('main');

let startButton = document.getElementById("start-button");

startButton.addEventListener('click', promptPlayers);
