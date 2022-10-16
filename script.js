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
            MAINCONTAINER.innerHTML += `<div style="display: flex;">
                                            <div style="display: flex; flex-direction: column;">
                                                <label>Player 1 Name</label>
                                                <input id="P1_input">
                                                <div style="display: flex;">
                                                    <p>X</p>
                                                    <input type="radio" value="X" name="P1Choice" class="P1Choice">
                                                    <p>O</p>
                                                    <input type="radio" value="O" name="P1Choice" class="P1Choice">
                                                </div>
                                            </div>
                                            <div style="display: flex; flex-direction: column;">
                                                <label>Player 2 Name</label>
                                                <input id="P2_input">
                                                <div style="display: flex;">
                                                    <p>X</p>
                                                    <input type="radio" value="X" name="P2Choice" class="P2Choice">
                                                    <p>O</p>
                                                    <input type="radio" value="O" name="P2Choice" class="P2Choice">
                                                </div>
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <button class="confirm-btn">Confirm</button>
                                            <button class="back-btn">Back</button>
                                        </div>`
        } else if (gameType == 'computer') {
            MAINCONTAINER.innerHTML += `<div style="display: flex;">
                                                <div style="display: flex;">
                                                    <p>X</p>
                                                    <input type="radio" value="X" name="P1Choice" class="P1Choice">
                                                    <p>O</p>
                                                    <input type="radio" value="O" name="P1Choice" class="P1Choice">
                                                </div>
                                        </div>
                                        <div style="display: flex;">
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
            console.log('works');
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

            let player1 = gameController.Player('Player 1', P1Choice);
            let computer = gameController.Computer(player1);
            gameController.setTeams(player1, computer);
            gameController.setGameTypeAI();

            MAINCONTAINER.innerHTML = '';
            render.drawBoard();

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
        const gameboard = [];
        const team = (() => {
            if (player.team == 'X') {
                return 'O';
            } else {
                return 'X';
            };
        })();

        return {gameboard, team};
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
        let pos = e.target.id;
        let team = currentTeam.team;
        let gameBoard = currentTeam.gameboard

        if (board[pos] != null) {
            return;
        }
        
        switch(team) {  // // Will set gameboard square to currentTeam, and check for game condition
            case 'X':
                board[pos] = 'X';
                currentTeam.gameboard.push(pos);
                render.drawBoard();
                checker(gameBoard, winningConditions);
                switchTeams();
                break;
            case 'O':
                board[pos] = 'O';
                currentTeam.gameboard.push(pos);
                render.drawBoard();
                checker(gameBoard, winningConditions);
                switchTeams();
                break;
            default: 
                return;
        }

        if (isGameAI) {
            if (isGameOver) {
                return;
            } else {
                setTimeout(() => {
                    nextMove();
                    checker(player2.gameboard, winningConditions);
                }, 1000);
                
            }
        }
    }

    const nextMove = () => {
        let index = Math.floor(Math.random() * board.length);

        if (board[index] != null) {
            nextMove();
        } else {
            board[index] = player2.team;
            player2.gameboard.push(`${index}`);
            render.drawBoard();
        }
    }

    const checker = (arr, target) => {
        let isGameWon;
        let playerArray = arr.map(x => x * 1);
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

            if(isGameWon === true) {
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
                            boxes[index].style.backgroundColor = '#d35353';
                        }
                    }
                }
                isGameOver = true;
                // Add Rematch and Startover buttons
                addRSButtons();
            } else if (isGameWon === 'draw') {
                // Remove makeMove event function from each gameboard box & change colour of all squares
                for (let i = 0; i < boxes.length; i++) {                
                    boxes[i].removeEventListener('click', makeMove);
                    boxes[i].style.backgroundColor = '#d35353';
                }
                isGameOver = true;
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
        forfeitTeam = player2.team;

        for (let i = 0; i < board.length; i++) { 
            if (board[i] == null) {
                board[i] = player2.team;
            }
        };
        render.drawBoard();
    }

    const player2Forfeit = () => {
        forfeit = true;
        forfeitTeam = player2.team;

        for (let i = 0; i < board.length; i++) { 
            if (board[i] == null) {
                board[i] = player1.team;
            }
        };
        render.drawBoard();
    }

    const getForfeit = () => {
        return forfeit;
    }

    const getAI = () => {
        return isGameAI;
    }

    const getForfeitTeam = () => {
        return forfeitTeam;
    }

    const rematch = () => {
        player1.gameboard = [];
        player2.gameboard = [];

        forfeit = false;
        forfeitTeam = undefined;
        isGameAI = false;
        isGameOver = false;

        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        };

        currentTeam = player1;

        render.drawBoard();
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
                <div class="container forfeit"><div class="canvas"></div></div>
                <div class="button-set"><button class="rematch">Rematch</button><button class="start-over">Start Over</button></div>`;
                
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
                    if (gameController.board[i] == gameController.getForfeitTeam()) {
                        console.log('yo');
                        Box.className = 'box noselect forfeitTeam';
                    } else {
                        Box.className = 'box noselect forfeit';
                    }
                    Box.setAttribute('id', `${i}`);
                    Canvas.appendChild(Box);
                }
               
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
                <div class="container forfeit"><div class="canvas"></div></div>
                <div class="button-set"><button class="rematch">Rematch</button><button class="start-over">Start Over</button></div>`;
                
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
                    if (gameController.board[i] == gameController.getForfeitTeam()) {
                        console.log('yo');
                        Box.className = 'box noselect forfeitTeam';
                    } else {
                        Box.className = 'box noselect forfeit';
                    }
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


