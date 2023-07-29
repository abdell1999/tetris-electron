const canvas = document.getElementById('board');
const context = canvas.getContext('2d');

// Calculate size of the blocks
const blockSize = 30;
context.scale(blockSize, blockSize);

// Tetris pieces and their rotations
const pieces = {
    'I': [[[1], [1], [1], [1]], [[1, 1, 1, 1]], [[1], [1], [1], [1]], [[1, 1, 1, 1]]],
    'J': [[[1, 0], [1, 0], [1, 1]], [[1, 1, 1], [1, 0, 0]], [[1, 1], [0, 1], [0, 1]], [[0, 0, 1], [1, 1, 1]]],
    'L': [[[0, 1], [0, 1], [1, 1]], [[1, 0, 0], [1, 1, 1]], [[1, 1], [1, 0], [1, 0]], [[1, 1, 1], [0, 0, 1]]],
    'O': [[[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]]],
    'S': [[[0, 1, 1], [1, 1]], [[1, 0], [1, 1], [0, 1]], [[0, 1, 1], [1, 1]], [[1, 0], [1, 1], [0, 1]]],
    'T': [[[0, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 0]], [[1, 1, 1], [0, 1, 0]], [[0, 1], [1, 1], [0, 1]]],
    'Z': [[[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]], [[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]]]
};

// Functions to handle pieces
function createPiece(type) {
    return { type: type, rotationIndex: 0, matrix: pieces[type][0] }; // Start with the first rotation
}

function drawPiece(piece, offset) {
    piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'white';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function merge(board, player) {
    player.piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function collide(board, player) {
    const m = player.piece.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (board[y + o.y] && board[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function rotate(piece) {
    const rotations = pieces[piece.type]; // Get all the rotations for this piece
    let nextRotationIndex = piece.rotationIndex + 1;
    if (nextRotationIndex >= rotations.length) { // If we've gone past the last rotation, go back to the first
        nextRotationIndex = 0;
    }
    return { type: piece.type, rotationIndex: nextRotationIndex, matrix: rotations[nextRotationIndex] }; // Return a new piece with the new rotation
}

// Functions to handle board
function createBoard(width, height) {
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

function drawBoard(board) {
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            context.fillStyle = value ? 'white' : 'black';
            context.fillRect(x, y, 1, 1);
        });
    });
}
function removeCompletedRows(board) {
    outer: for (let y = board.length - 1; y >= 0; --y) {
        for (let x = 0; x < board[y].length; ++x) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }
        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;
    }
}

// Player
const player = {
    pos: { x: 5, y: 5 },
    piece: null
};

// Game board
let board = createBoard(10, 20);

// Game loop
function update() {
    drawBoard(board);
    drawPiece(player.piece, player.pos);
}

function playerReset() {
    const types = 'IJLOSTZ';
    player.piece = createPiece(types[Math.floor(Math.random() * types.length)]);
    player.pos.y = 0;
    player.pos.x = (board[0].length / 2 | 0) - (player.piece.matrix[0].length / 2 | 0);
    if (collide(board, player)) {
        board = createBoard(10, 20);
    }
}


function playerMove(dir) {
    player.pos.x += dir;
    if (collide(board, player)) {
        player.pos.x -= dir;
    }
}

function playerDrop() {
    player.pos.y++;
    if (collide(board, player)) {
        player.pos.y--;
        merge(board, player);
        playerReset();
        removeCompletedRows(board);
    }
}


function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    player.piece = rotate(player.piece, dir);
    while (collide(board, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.piece[0].length) {
            player.piece = rotate(player.piece, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
        dropCounter = 0;
    }
    lastTime = time;
    drawBoard(board);
    drawPiece(player.piece, player.pos);
    requestAnimationFrame(update);
}

playerReset();
update();

// Event listeners for keyboard controls
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        playerMove(-1);
    } else if (event.key === 'ArrowRight') {
        playerMove(1);
    } else if (event.key === 'ArrowDown') {
        playerDrop();
    } else if (event.key === 'ArrowUp') {
        playerRotate(1);
    }
});
