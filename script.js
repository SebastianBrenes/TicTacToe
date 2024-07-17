
const Gameboard = function () {
    this.board = 
    ['', '', 'x',
     '', '', 'x',
     '', '', 'x'];

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

const player1 = createPlayer("Juancito", 'x');
const player2 = createPlayer("Jacinto", 'O');

let tictactoe = new Gameboard();

tictactoe.checkWin(player1.char, player1.playerName)




