const MAINCONTAINER = document.querySelector('.main-container');

const intro = (() => {
    const MAINCONTAINER = document.querySelector('.main-container');

    const createIntroItems = () => {
        const GAMETITLE = document.createElement('h1');
        GAMETITLE.textContent = 'Tic-Tac-Toe'
        GAMETITLE.className = 'game-title';

        const BUTTONSET = document.createElement('div');
        BUTTONSET.className = 'btn-set';

        const TWOPLAYER = document.createElement('button');
        TWOPLAYER.textContent = 'Two Player';
        TWOPLAYER.className = 'intro-btn two-player-btn';
        TWOPLAYER.addEventListener('click', () => {
            BUTTONSET.remove();
            addPlayerInputs();
        });
        BUTTONSET.appendChild(TWOPLAYER);

        const COMPUTER = document.createElement('button');
        COMPUTER.textContent = 'Computer';
        COMPUTER.className = 'intro-btn computer-btn';
        COMPUTER.addEventListener('click', () => {
            
        });
        BUTTONSET.appendChild(COMPUTER);

        MAINCONTAINER.appendChild(GAMETITLE);
        MAINCONTAINER.appendChild(BUTTONSET);
    };

    createIntroItems();

    const addPlayerInputs = () => {
        // INPUTS UNDERNEATH 
        // ------ INPUT CONTAINER ------
        const INPUTSET = document.createElement('div');
        INPUTSET.style.display = 'flex';

        // ---- PLAYER INPUT CONTAINERS ----
        const P1DIV = document.createElement('div');
        P1DIV.style.display = 'flex';
        P1DIV.style.flexDirection = 'column';
        const P2DIV = document.createElement('div');
        P2DIV.style.display = 'flex';
        P2DIV.style.flexDirection = 'column';

        // -- PLAYER 1 INPUT & LABEL
        const P1LABEL = document.createElement('label');
        P1LABEL.textContent = 'Player 1 Name'
        const P1INPUT = document.createElement('input');
        P1INPUT.id = 'P1_input';
        P1DIV.appendChild(P1LABEL);
        P1DIV.appendChild(P1INPUT);

        // -- PLAYER 1 TEAM CHOICE
        const P1CHOICESET = document.createElement('div');
        P1CHOICESET.style.display = 'flex';
        
        const P1XCHOICE_LABEL = document.createElement('p');
        P1XCHOICE_LABEL.textContent = 'X';


        const P1XCHOICE = document.createElement('input');
        P1XCHOICE.type = 'radio';
        P1XCHOICE.value = 'X';
        P1XCHOICE.name = 'P1Choice'
        P1XCHOICE.classList = 'P1Choice';

        const P1OCHOICE_LABEL = document.createElement('p');
        P1OCHOICE_LABEL.textContent = 'O';

        const P1OCHOICE = document.createElement('input');
        P1OCHOICE.type = 'radio';
        P1OCHOICE.value = 'O';
        P1OCHOICE.name = 'P1Choice';
        P1OCHOICE.classList = 'P1Choice';
        

        P1CHOICESET.appendChild(P1XCHOICE_LABEL);
        P1CHOICESET.appendChild(P1XCHOICE);
        P1CHOICESET.appendChild(P1OCHOICE_LABEL);
        P1CHOICESET.appendChild(P1OCHOICE);

        // -- PLAYER 1 APPEND RADIO BUTTONS & LABELS TO MAIN P1 DIV
        P1DIV.appendChild(P1CHOICESET);

        // -- PLAYER 2 INPUT & LABEL
        const P2LABEL = document.createElement('label');
        P2LABEL.textContent = 'Player 2 Name';
        const P2INPUT = document.createElement('input');
        P2INPUT.id = 'P2_input'
        P2DIV.appendChild(P2LABEL);
        P2DIV.appendChild(P2INPUT);

        // -- PLAYER 2 TEAM CHOICE
        const P2CHOICESET = document.createElement('div');
        P2CHOICESET.style.display = 'flex';
        
        const P2XCHOICE_LABEL = document.createElement('p');
        P2XCHOICE_LABEL.textContent = 'X';


        const P2XCHOICE = document.createElement('input');
        P2XCHOICE.type = 'radio';
        P2XCHOICE.value = 'X';
        P2XCHOICE.name = 'P2Choice'
        P2XCHOICE.className = 'P2Choice';

        const P2OCHOICE_LABEL = document.createElement('p');
        P2OCHOICE_LABEL.textContent = 'O';

        const P2OCHOICE = document.createElement('input');
        P2OCHOICE.type = 'radio';
        P2OCHOICE.value = 'O';
        P2OCHOICE.name = 'P2Choice';
        P2OCHOICE.className = 'P2Choice';
        

        P2CHOICESET.appendChild(P2XCHOICE_LABEL);
        P2CHOICESET.appendChild(P2XCHOICE);
        P2CHOICESET.appendChild(P2OCHOICE_LABEL);
        P2CHOICESET.appendChild(P2OCHOICE);

        // -- PLAYER 2 APPEND RADIO BUTTONS & LABELS TO MAIN P2 DIV
        P2DIV.appendChild(P2CHOICESET);

        // APPEND P1 & P2 DIVS TO INPUT CONTAINER
        INPUTSET.appendChild(P1DIV);
        INPUTSET.appendChild(P2DIV);
        MAINCONTAINER.appendChild(INPUTSET);

        // BUTTONS UNDERNEATH ------------
        const BUTTONSET = document.createElement('div');
        BUTTONSET.style.display = 'flex';

        const CONFIRM = document.createElement('button');
        CONFIRM.textContent = 'Confirm';
        CONFIRM.addEventListener('click', dummyFuncConfirm);

        const BACK = document.createElement('button');
        BACK.textContent = 'Back';
        BACK.addEventListener('click', dummyFuncBack);

        

        BUTTONSET.appendChild(CONFIRM);
        BUTTONSET.appendChild(BACK);
        MAINCONTAINER.appendChild(BUTTONSET);

    }   

    const dummyFuncConfirm = () => {
        const P1Name = document.getElementById('P1_input').value;
        const P2Name = document.getElementById('P2_input').value;
        let P1Choice = null;
        let P2Choice = null;
        
        //Finds Player 1 team choice
        const P1CHOICES = document.querySelectorAll('.P1Choice');
        P1CHOICES.forEach((choice) => {
            if (choice.checked === true) {
                P1Choice = choice.value;
            }
        });

        //Finds Player 2 team choice
        const P2CHOICES = document.querySelectorAll('.P2Choice')
        P2CHOICES.forEach((choice) => {
            if (choice.checked === true) {
                P2Choice = choice.value;
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
           
            let children = MAINCONTAINER.children;
            Array.prototype.forEach.call(children, (child) => child.remove());
            children[0].remove(); // Final remove() because forEach wasn't deleting every node
            render.drawBoard(); 
        }
    }

    const dummyFuncBack = () => {
        let children = MAINCONTAINER.children;
        Array.prototype.forEach.call(children, (child) => child.remove());
        children[0].remove(); // Final remove() because forEach wasn't deleting every node
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
    
    // Public function: sets gameController teams
    const setTeams = (x, y) => {
        player1 = x;
        player2 = y;
        currentTeam = player1;
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
                // Add Rematch and Startover buttons
                addRSButtons();
            } else if (isGameWon === 'draw') {
                // Remove makeMove event function from each gameboard box & change colour of all squares
                for (let i = 0; i < boxes.length; i++) {                
                    boxes[i].removeEventListener('click', makeMove);
                    boxes[i].style.backgroundColor = '#d35353';
                }
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
        const newTeam = currentTeam == player1 ? player2 : player1;
        currentTeam = newTeam;
    }

    const player1Forfeit = () => {
        forfeit = true;
        for (let i = 0; i < board.length; i++) { 
            board[i] = player2.team;
        };
        render.drawBoard();
    }

    const player2Forfeit = () => {
        forfeit = true;
        for (let i = 0; i < board.length; i++) { 
            board[i] = player1.team;
        };
        render.drawBoard();
    }

    const getForfeit = () => {
        return forfeit;
    }

    const rematch = () => {
        player1.gameboard = [];
        player2.gameboard = [];

        forfeit = false;

        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        };

        currentTeam = player1;

        render.drawBoard();
    }

    const startOverGame = () => {
        forfeit = false;

        for (let i = 0; i < gameboard.board.length; i++) {
            board[i] = null;
        }
        render.clearContainer();
        intro.createIntroItems();
    }

    return {
        board,
        Player,
        setTeams,
        makeMove,
        rematch,
        startOverGame,
        player1Forfeit,
        player2Forfeit,
        getForfeit    
    }
})();

const render = (() => {

    const drawBoard = () => {
        clearContainer();
        if (gameController.getForfeit()) {
            const CONTAINER = document.createElement('div');
            CONTAINER.className = 'container forfeit';
    
            const GAMETITLE = document.createElement('h1');
            GAMETITLE.textContent = 'Tic-Tac-Toe'
            GAMETITLE.className = 'game-title';
    
            const CANVAS = document.createElement('div');
            CANVAS.className = 'canvas';
    
            const BUTTONSET = document.createElement('div');
            const REMATCH = document.createElement('button');
            const STARTOVER = document.createElement('button');
            REMATCH.textContent = 'Rematch';
            STARTOVER.textContent = 'Start Over';
            BUTTONSET.className = 'button-set';
    
            STARTOVER.addEventListener('click', gameController.startOverGame);
    
            REMATCH.addEventListener('click', gameController.rematch);
    
    
            
            let i = 0;
        
            gameController.board.forEach((pos) => {
                const BOX = document.createElement('div'); 
                BOX.textContent = pos;
                BOX.style.width = '1fr';
                BOX.style.height = '1fr';
                BOX.className = 'box noselect forfeit';
                BOX.setAttribute('id', `${i}`);
                i++;
                CANVAS.appendChild(BOX);
            });
            CONTAINER.appendChild(CANVAS);
            BUTTONSET.appendChild(REMATCH);
            BUTTONSET.appendChild(STARTOVER);
            MAINCONTAINER.appendChild(GAMETITLE);
            MAINCONTAINER.appendChild(CONTAINER);
            MAINCONTAINER.appendChild(BUTTONSET);
            
            return;
        }

        const CONTAINER = document.createElement('div');
        CONTAINER.className = 'container';
        
        const GAMETITLE = document.createElement('h1');
        GAMETITLE.textContent = 'Tic-Tac-Toe'
        GAMETITLE.className = 'game-title';
    
        const CANVAS = document.createElement('div');
        CANVAS.className = 'canvas';
    
        const BUTTONSET = document.createElement('div');
        BUTTONSET.className = 'button-set';
    
        const FORFEIT_P1 = document.createElement('button');
        const FORFEIT_P2 = document.createElement('button');
        FORFEIT_P1.textContent = 'Player 1 Forfeit';
        FORFEIT_P2.textContent = 'Player 2 Forfeit';
        BUTTONSET.className = 'button-set';
        FORFEIT_P1.addEventListener('click', gameController.player1Forfeit);
    
        FORFEIT_P2.addEventListener('click', gameController.player2Forfeit);
    
        BUTTONSET.appendChild(FORFEIT_P1);
        BUTTONSET.appendChild(FORFEIT_P2);
        CONTAINER.appendChild(CANVAS);
        MAINCONTAINER.appendChild(GAMETITLE);
        MAINCONTAINER.appendChild(CONTAINER);
        MAINCONTAINER.appendChild(BUTTONSET);
        
        let i = 0;
        
        gameController.board.forEach((pos) => {
            const BOX = document.createElement('div'); 
            BOX.addEventListener('click', gameController.makeMove);
    
            BOX.textContent = pos;
            BOX.style.width = '1fr';
            BOX.style.height = '1fr';
            BOX.className = 'box noselect';
            BOX.setAttribute('id', `${i}`);
            i++;
            CANVAS.appendChild(BOX);
        });
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


