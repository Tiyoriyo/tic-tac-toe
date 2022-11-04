const MAINCONTAINER = document.querySelector('.main-container');

const intro = (() => {
    const MAINCONTAINER = document.querySelector('.main-container');
    let gameType;

    const createIntroItems = () => {
        MAINCONTAINER.innerHTML += `<img class="game-title" src="images/TicTacToe.png"></img>
        <div class="button-set"><button class="intro-btn two-player-btn">Two Player</button>
        <button class="intro-btn computer-btn">Computer</button>
        </div>`

        const TwoPly = document.querySelector('.two-player-btn');
        const ComputerPly = document.querySelector('.computer-btn');
        const ButtonSet = document.querySelector('.button-set');

        TwoPly.addEventListener('click', () => {
            ButtonSet.remove();
            gameType = 'twoPlayer';
            addPlayerInputs();
        });
        
        ComputerPly.addEventListener('click', () => {
            ButtonSet.remove();
            gameType = 'computer';
            addPlayerInputs();
        });
    };

    createIntroItems();

    const addPlayerInputs = () => {
        if (gameType =='twoPlayer') {
            MAINCONTAINER.innerHTML += `<div class="intro-field">
                                            <div class="intro-field-card">
                                                <label for="P1_input">Player 1 Name</label>
                                                <input id="P1_input" autocomplete="off" spellcheck="false">
                                                <div class="intro-field-choices1">
                                                    <label for="p1choice1">X</label>
                                                    <input type="radio" value="X" id="p1choice1" name="P1Choice" class="P1Choice">
                                                    <label for="p1choice2">O</label>
                                                    <input type="radio" value="O" id="p1choice2" name="P1Choice" class="P1Choice">
                                                </div>
                                            </div>
                                            <div class="intro-field-card">
                                                <label for="P2_input">Player 2 Name</label>
                                                <input id="P2_input" autocomplete="off" spellcheck="false">
                                                <div class="intro-field-choices2">
                                                    <label for="p2choice1">X</label>
                                                    <input type="radio" value="X" id="p2choice1" name="radio-group" class="P2Choice">
                                                    <label for="p2choice2">O</label>
                                                    <input type="radio" value="O" id="p2choice2" name="radio-group" class="P2Choice">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="button-set">
                                            <button class="confirm-btn">Confirm</button>
                                            <button class="back-btn">Back</button>
                                        </div>`
        } else if (gameType == 'computer') {
            MAINCONTAINER.innerHTML += `<div style="display: flex;">
                                                <div class="intro-field-choices">
                                                    <p>X</p>
                                                    <input type="radio" value="X" name="P1Choice" class="P1Choice">
                                                    <p>O</p>
                                                    <input type="radio" value="O" name="P1Choice" class="P1Choice">
                                                </div>
                                        </div>
                                        <div class="button-set">
                                            <button class="confirm-btn">Confirm</button>
                                            <button class="back-btn">Back</button>
                                        </div>`
        }

        const Confirm = document.querySelector('.confirm-btn');
        const Back = document.querySelector('.back-btn');
        
        Confirm.addEventListener('click', startGame);
        Back.addEventListener('click', backToIntro);
    }   

    const startGame = () => {
        if (gameType == 'twoPlayer') {
            const P1Name = document.getElementById('P1_input').value;
            const P2Name = document.getElementById('P2_input').value;
            let P1Choice = null;
            let P2Choice = null;
            
            //Finds Player 1 team choice
            const P1CHOICES = document.querySelectorAll('.P1Choice');
            P1CHOICES.forEach((choice) => {
                if (choice.checked === true) {
                    P1Choice = choice.value;
                    return
                }
            });
    
            //Finds Player 2 team choice
            const P2CHOICES = document.querySelectorAll('.P2Choice')
            P2CHOICES.forEach((choice) => {
                if (choice.checked === true) {
                    P2Choice = choice.value;
                    return
                }
            });
    
            //CHECKS IF BOTH PLAYERS HAVE THE SAME TEAMS
            if (P1Choice === P2Choice) {
                alert('You must have different choices');
            } else if (!P1Choice || !P2Choice) {
                alert('You need to pick a team');
            } else {
                let player1 = gameController.Player(P1Name, P1Choice);
                let player2 = gameController.Player(P2Name, P2Choice);
    
                gameController.setTeams(player1, player2);
               
                MAINCONTAINER.innerHTML = '';
                render.drawBoard(); 
                soundPlay.login();
            }
        } else if (gameType == 'computer') {
            let P1Choice = null;
            
            const P1Choices = document.querySelectorAll('.P1Choice');
            P1Choices.forEach((choice) => {
                if (choice.checked === true) {
                    P1Choice = choice.value;
                    return;
                }
            })

            if (!P1Choice) {
                alert('You need to pick a team');
            } else {
                let player1 = gameController.Player('Player 1', P1Choice);
                let computer = gameController.Computer(player1);
                gameController.setTeams(player1, computer);
                gameController.setGameTypeAI();
    
                MAINCONTAINER.innerHTML = '';
                render.drawBoard();
                soundPlay.login();
            }


        }
    }

    const backToIntro = () => {
        MAINCONTAINER.innerHTML = '';
        createIntroItems(); // Restart module
    }

    return {
        createIntroItems,
    }
})();

const gameboard = (() => {
    const board = [
        null, null, null,
         null, null, null,
          null, null, null
    ];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];
    
    return {
        board,
        winningConditions,
    }
})();


const gameController = (() => {
    let forfeitTeam;
    let isGameAI = false;
    let isGameOver = false;
    let board = gameboard.board;
    let winningConditions = gameboard.winningConditions;

    var player1;
    var player2;
    var currentTeam;
    var forfeit = false;

    // Player Factory Function
    const Player = (name, team) => {
        const gameboard = [];
        return {name, team, gameboard}
    };

    // Computer Factory Function
    const Computer = (player) => {
        const name = 'Computer';
        const gameboard = [];
        const team = (() => {
            if (player.team == 'X') {
                return 'O';
            } else {
                return 'X';
            };
        })();

        return {name, gameboard, team};
    };
    
    // Public function: sets gameController teams
    const setTeams = (x, y) => {
        player1 = x;
        player2 = y;
        currentTeam = player1;
    }

    const setGameTypeAI = () => {
        isGameAI = true;
    }

    // makeMove event function
    const makeMove = (e) => {
        let pos = +e.target.id;
        let team = currentTeam.team

        if (board[pos] != null) {
            return;
        }
        
        switch(team) {  // // Will set gameboard square to currentTeam, and check for game condition
            case 'X':
                board[pos] = 'X';
                currentTeam.gameboard.push(pos);
                soundPlay.scribble();
                render.drawBoard();
                checker(currentTeam, winningConditions);
                switchTeams();
                break;
            case 'O':
                board[pos] = 'O';
                currentTeam.gameboard.push(pos);
                soundPlay.scribble();
                render.drawBoard();
                checker(currentTeam, winningConditions);
                switchTeams();
                break;
            default: 
                return;
        }

        if (isGameAI) {
            if (isGameOver) {
                return;
            } else {
                let boxes = document.querySelectorAll('.box');
                boxes.forEach((box) => {
                    box.removeEventListener('click', makeMove);
                    setTimeout(() => {
                        box.addEventListener('click', makeMove);
                    }, 800);
                });

                setTimeout(() => {
                    bestMove();
                }, 800);
                
            }
        }
    }

    const bestMove = () => {
    
        // AI to make its turn
        let bestScore = -Infinity
        let move;

        for (let i = 0; i < board.length; i++) {
            if (board[i] == null) {
                board[i] = player2.team;
                let score = minimax(board, 0, false);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        board[move] = player2.team;
        player2.gameboard.push(move);
        render.drawBoard();
        soundPlay.scribble();
        checker(player2, winningConditions);
    }

    const minimax = (board, depth, maximizingPlayer) => {
        let result = checkWin(board);

        if (result !== null) {
            return result == 'computer' ? 10 - depth
                :   result == 'enemy' ? depth - 10
                :   0;
        }
        
        if (maximizingPlayer == true) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] == null) {
                    board[i] = player2.team;
                    let score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else if (maximizingPlayer == false) {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] == null) {
                    board[i] = player1.team;
                    let score = minimax(board, depth + 1, true)
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    const checkWin = (board) => {
        for (let i = 0; i < winningConditions.length; i++) {        // Check if any winning combinations are present on the board
            let pos1 = winningConditions[i][0];
            let pos2 = winningConditions[i][1];
            let pos3 = winningConditions[i][2];

            
            if (board[pos1] == player1.team && board[pos2] == player1.team && board[pos3] == player1.team) {
                return 'enemy';
            } else if (board[pos1] == player2.team && board[pos2] == player2.team && board[pos3] == player2.team) {
                return 'computer';
            } 
            
        }

        let count = 0;

        for (let j = 0; j < board.length; j++) {                    // Check if the game is tied given no winning combinations are
            if (board[j] == player1.team || board[j] == player2.team) {
                count += 1;
            }
        }

        if (count == 9) {
            return 'tie';
        } else {
            return null
        }
    }
    
    const checker = (player, target) => {
        let isGameWon;
        let playerArray = player.gameboard.map(x => x * 1);
        
        // Check if the game is won/drawn
        for (let i = 0; i < target.length; i++) {   
            let boolean = target[i].every(v => playerArray.includes(v));    
           
            if (boolean) {
                isGameWon = true;
                break;
            } else if (!boolean) {
                isGameWon = false;
            } 
        
            if (playerArray.length === 5 && !boolean) {
                isGameWon = 'draw';
            };
        }

        (function(isGameWon, playerArray, target) {
            const boxes = document.querySelectorAll('.box');
            const Container = document.querySelector('.container');
            const Canvas = document.querySelector('.canvas');

            if(isGameWon == true) {
                // Remove makeMove event function from each gameboard box
                for (let i = 0; i < boxes.length; i++) {                
                    boxes[i].removeEventListener('click', makeMove);
                }
                
                // Change colour of winning squares
                for (let i = 0; i < target.length; i++) {              
                    let boolean = target[i].every(v => playerArray.includes(v));

                    if (boolean) {
                        const winningSquares = target[i];
                        for (let i = 0; i < winningSquares.length; i++) {
                            let index = winningSquares[i];
                            if(isGameAI) {
                                boxes[index].style.backgroundColor = '#d35353'
                            } else {
                                boxes[index].style.backgroundColor = '#5ed199';
                            }
                        }
                        if(!isGameAI) {
                            Container.classList += ' forfeit'
                        }
                    }
                }

                Canvas.className += ' blur';
                Container.innerHTML += `<p class="z1">${player.name} wins..</p>`;
                soundPlay.win();
                
                isGameOver = true;
                // Add Rematch and Startover buttons
                addRSButtons();
            } else if (isGameWon === 'draw') {
                // Remove makeMove event function from each gameboard box & change colour of all squares
                for (let i = 0; i < boxes.length; i++) {                
                    boxes[i].removeEventListener('click', makeMove);
                    boxes[i].classList.add('boxDraw');
                }
                Container.classList.add('containerDraw');
                Canvas.classList += ' blur';
                Container.innerHTML += `<p class="z1">Only idiots draw</p>`;
                isGameOver = true;
                soundPlay.loss();
                // Add Rematch and Startover buttons
                addRSButtons();
            }
        })(isGameWon, playerArray, target);
    };
    
    const addRSButtons = () => {
        document.querySelector('.button-set').remove();
        MAINCONTAINER.innerHTML += `<div class="button-set"><button class='rematch'>Rematch</button><button class='start-over'>Start Over</button></div>`;
        const rematchBtn = document.querySelector('.rematch');
        const startOverBtn = document.querySelector('.start-over');
        rematchBtn.addEventListener('click', rematch);
        startOverBtn.addEventListener('click', startOverGame);
    }

    const switchTeams = () => {
        if (isGameAI) {
            return
        };

        const newTeam = currentTeam == player1 ? player2 : player1;
        currentTeam = newTeam;
    }

    const player1Forfeit = () => {
        forfeit = true;
        forfeitTeam = player2.name;

        for (let i = 0; i < board.length; i++) { 
            if (board[i] == null) {
                board[i] = player2.team;
            }
        };
        render.drawBoard();
        soundPlay.loss();
    }

    const player2Forfeit = () => {
        forfeit = true;
        forfeitTeam = player1.name;

        for (let i = 0; i < board.length; i++) { 
            if (board[i] == null) {
                board[i] = player1.team;
            }
        };
        render.drawBoard();
        soundPlay.loss();
    }

    const getForfeit = () => {
        return forfeit;
    }

    const getAI = () => {
        return isGameAI;
    }

    const getForfeitTeam = () => {
        return forfeitTeam
    }

    const rematch = () => {
        player1.gameboard = [];
        player2.gameboard = [];

        if (!isGameAI) {isGameAI = false;}
        forfeit = false;
        forfeitTeam = undefined;
        isGameOver = false;

        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        };

        currentTeam = player1;
    
        render.drawBoard();
        soundPlay.login();
    }

    const startOverGame = () => {
        forfeit = false;
        forfeitTeam = undefined;
        isGameAI = false;
        isGameOver = false;

        for (let i = 0; i < gameboard.board.length; i++) {
            board[i] = null;
        }
        render.clearContainer();
        intro.createIntroItems();
    }

    const debug = () => {
        console.log(isGameAI);
        console.log(player1);
        console.log(player2);
    }

    return {
        board,
        Player,
        Computer,
        setTeams,
        setGameTypeAI,
        makeMove,
        rematch,
        startOverGame,
        player1Forfeit,
        player2Forfeit,
        getForfeit,
        getForfeitTeam,
        getAI,
        isGameAI,
        debug
    }
})();

const render = (() => {

    const drawBoard = () => {
        clearContainer();
        if (gameController.getAI()) {
            if (gameController.getForfeit()) {
                MAINCONTAINER.innerHTML += `<img class="game-title" src="images/TicTacToe.png"></img>
                <div class="container"><div class="canvas blur"></div></div>
                <div class="button-set"><button class="rematch">Rematch</button><button class="start-over">Start Over</button></div>`;

                const Container = document.querySelector('.container');
                Container.innerHTML += '<p class="z1">You Lost..</p>'
                const Canvas = document.querySelector('.canvas');
                const rematchBtn = document.querySelector('.rematch');
                const startOverBtn = document.querySelector('.start-over');
                


                rematchBtn.addEventListener('click', gameController.rematch);
                startOverBtn.addEventListener('click', gameController.startOverGame);
                
                for (let i = 0; i < gameController.board.length; i++) {
                    const Box = document.createElement('div');
                    Box.textContent = gameController.board[i]; 
                    Box.style.width = '1fr';
                    Box.style.height = '1fr';
                    Box.className = 'box noselect';
                    Box.setAttribute('id', `${i}`);
                    Canvas.appendChild(Box);
                }

                soundPlay.loss();
               
                return;
            }
            
            MAINCONTAINER.innerHTML += `<img class="game-title" src="images/TicTacToe.png"></img>
            <div class="container"><div class="canvas"></div></div>
            <div class="button-set"><button class="forfeit-p1">Player 1 Forfeit</button></div>`;

            const Canvas = document.querySelector('.canvas');
            const ForfeitP1 = document.querySelector('.forfeit-p1');
            ForfeitP1.addEventListener('click', gameController.player1Forfeit);

            for (let i = 0; i < gameController.board.length; i++) {
                const Box = document.createElement('div');
                Box.addEventListener('click', gameController.makeMove);
                Box.textContent = gameController.board[i]; 
                Box.style.width = '1fr';
                Box.style.height = '1fr';
                Box.className = 'box noselect';
                Box.setAttribute('id', `${i}`);
                Canvas.appendChild(Box);
            }
            
        } else if (!gameController.getAI()) {
            if (gameController.getForfeit()) {
                MAINCONTAINER.innerHTML += `<img class="game-title" src="images/TicTacToe.png"></img>
                <div class="container"><div class="canvas blur"></div></div>
                <div class="button-set"><button class="rematch">Rematch</button><button class="start-over">Start Over</button></div>`;
                
                const Container = document.querySelector('.container');
                Container.innerHTML += `<p class="z1">${gameController.getForfeitTeam()} lost..</p>`
                const Canvas = document.querySelector('.canvas');
                const rematchBtn = document.querySelector('.rematch');
                const startOverBtn = document.querySelector('.start-over');
    
                rematchBtn.addEventListener('click', gameController.rematch);
                startOverBtn.addEventListener('click', gameController.startOverGame);
                
                for (let i = 0; i < gameController.board.length; i++) {
                    const Box = document.createElement('div');
                    Box.textContent = gameController.board[i]; 
                    Box.style.width = '1fr';
                    Box.style.height = '1fr';
                    Box.className = 'box noselect';
                    Box.setAttribute('id', `${i}`);
                    Canvas.appendChild(Box);
                }
               
                return;
            }
    
            MAINCONTAINER.innerHTML += `<img class="game-title" src="images/TicTacToe.png"></img>
            <div class="container"><div class="canvas"></div></div>
            <div class="button-set"><button class="forfeit-p1">Player 1 Forfeit</button><button class="forfeit-p2">Player 2 Forfeit</button></div>`;
    
            const Canvas = document.querySelector('.canvas');
            const ForfeitP1 = document.querySelector('.forfeit-p1');
            const ForfeitP2 = document.querySelector('.forfeit-p2');
    
            ForfeitP1.addEventListener('click', gameController.player1Forfeit);    
            ForfeitP2.addEventListener('click', gameController.player2Forfeit);
            
            for (let i = 0; i < gameController.board.length; i++) {
                const Box = document.createElement('div');
                Box.addEventListener('click', gameController.makeMove);
                Box.textContent = gameController.board[i]; 
                Box.style.width = '1fr';
                Box.style.height = '1fr';
                Box.className = 'box noselect';
                Box.setAttribute('id', `${i}`);
                Canvas.appendChild(Box);
            }
            
            return;
        }
    }

    const clearContainer = () => {
        const GAMETITLE = document.querySelector('.game-title');
        const CONTAINER = document.querySelector('.container');
        const BUTTONSET = document.querySelector('.button-set')

        if (GAMETITLE) {
            GAMETITLE.remove();
        }
        if (CONTAINER) {
            CONTAINER.remove();
        }
        if (BUTTONSET) {
            BUTTONSET.remove();
        }
    }
    
    return {
        clearContainer,
        drawBoard,
    }
})();

const soundPlay = (() => {

    let sAudio = new Audio('sound-effect/scribble.mp3');
    let logAudio = new Audio('sound-effect/login.mp3');
    let wAudio = new Audio('sound-effect/win.mp3');
    let lAudio = new Audio('sound-effect/loss.mp3');

    const scribble = () => {
        sAudio.pause();
        sAudio.currentTime = 0;
        sAudio.play();
    };

    const login = () => {
        logAudio.pause();
        logAudio.currentTime = 0;
        logAudio.play();
    };

    const win = () => {
        wAudio.pause();
        wAudio.currentTime = 0;
        sAudio.pause();
        wAudio.play();
    };

    const loss = () => {
        lAudio.pause();
        lAudio.currentTime = 0;
        lAudio.play();
    };

    return {
        scribble,
        login,
        win,
        loss
    }
})();


