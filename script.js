const GAMEBOARD = (function() {
    const MAINCONTAINER = document.querySelector('.main-container');
    const gameboard = [
        null, null, null,
         null, null, null,
          null, null, null
    ];

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

    var player1;
    var player2;
    var currentTeam;
    var win = false;

    function intro() {
        (function createIntroItems() {
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
        })();

        function addPlayerInputs() {
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
            CONFIRM.addEventListener('click', () => {
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
                    player1 = new Player(P1INPUT.value, P1Choice);
                    player2 = new Player(P2INPUT.value, P2Choice);
                    currentTeam = player1;
    
                    let children = MAINCONTAINER.children;
                    Array.prototype.forEach.call(children, (child) => child.remove());
                    children[0].remove(); // Final remove() because forEach wasn't deleting every node
                    render(); 
                }
            });

            const BACK = document.createElement('button');
            BACK.textContent = 'Back';
            BACK.addEventListener('click', () => {
                let children = MAINCONTAINER.children;
                Array.prototype.forEach.call(children, (child) => child.remove());
                children[0].remove(); // Final remove() because forEach wasn't deleting every node
                intro(); // Restart module
            });

            BUTTONSET.appendChild(CONFIRM);
            BUTTONSET.appendChild(BACK);
            MAINCONTAINER.appendChild(BUTTONSET);
        }
        
    }

    intro();

    function render() {

        if (win === true) {
            const CONTAINER = document.createElement('div');
            CONTAINER.className = 'container win';

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

            STARTOVER.addEventListener('click', () => {
                player1.gameboard = [];
                player2.gameboard = [];

                win = false;

                for (let i = 0; i < gameboard.length; i++) {
                    gameboard[i] = null;
                }

                clearContainer();
                intro();
            });

            REMATCH.addEventListener('click', () => {
                player1.gameboard = [];
                player2.gameboard = [];

                win = false;

                for (let i = 0; i < gameboard.length; i++) {
                    gameboard[i] = null;
                };

                clearContainer();
                render();
            });


            
            let i = 0;
        
            gameboard.forEach((pos) => {
                const BOX = document.createElement('div'); 
                BOX.textContent = pos;
                BOX.style.width = '1fr';
                BOX.style.height = '1fr';
                BOX.className = 'box noselect win';
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
        FORFEIT_P1.addEventListener('click', () => {
            for (let i = 0; i < gameboard.length; i++) {
                gameboard[i] = `${player2.team}`;
                win = true;
                clearContainer();
                render();
            };
        })

        FORFEIT_P2.addEventListener('click', () => {
            for (let i = 0; i < gameboard.length; i++) {
                gameboard[i] = `${player1.team}`;
                win = true;
                clearContainer();
                render();
            };
        })

        BUTTONSET.appendChild(FORFEIT_P1);
        BUTTONSET.appendChild(FORFEIT_P2);
        CONTAINER.appendChild(CANVAS);
        MAINCONTAINER.appendChild(GAMETITLE);
        MAINCONTAINER.appendChild(CONTAINER);
        MAINCONTAINER.appendChild(BUTTONSET);
        
        let i = 0;
        
        gameboard.forEach((pos) => {
            const BOX = document.createElement('div'); 
            BOX.addEventListener('click', (e) => {
                makeMove(e, currentTeam);
            });
            BOX.textContent = pos;
            BOX.style.width = '1fr';
            BOX.style.height = '1fr';
            BOX.className = 'box noselect';
            BOX.setAttribute('id', `${i}`);
            i++;
            CANVAS.appendChild(BOX);
        });

    };

    let Player = function(name, team) {
        this.name = name;
        this.team = team;
        this.gameboard = [];
    };

    function makeMove(e, player) {
        if (gameboard[e.target.id] === 'X' || gameboard[e.target.id] === 'O') {
            console.log('no');
            return;
        } else {
            if (player.team === 'X') {
                player.gameboard.push(e.target.id);
                gameboard[e.target.id] = 'X';

                currentTeam = switchTeams();
                clearContainer();
                render();
                checker(player.gameboard, WINNING_COMBINATIONS);
    
            } else if (player.team === 'O') {
                player.gameboard.push(e.target.id);
                gameboard[e.target.id] = 'O';

                currentTeam = switchTeams();
                clearContainer();
                render();
                checker(player.gameboard, WINNING_COMBINATIONS);
            }
        }
    }

    function checker(arr, target) {
        let result;
        let playerArray = arr.map(x => x * 1);
        
        for (let i = 0; i < target.length; i++) {
            let boolean = target[i].every(v => playerArray.includes(v));

            if (boolean === false) {
                result = boolean;
            } else if (boolean === true) {
                result = boolean;
                console.log(result);
                break;
            };

            if (playerArray.length === 5 && boolean === false) {
                result = 'draw';
            };
        };

        (function(result, playerArray, target ) {
            if(result === true || result === 'draw') {  
                // make all boxes with moves that match winning combination green
                // make a list of matching boxes
                // 
                for (let i = 0; i < target.length; i++) {
                    let boolean = target[i].every(v => playerArray.includes(v));

                    if (boolean) {
                        let squareList = document.querySelectorAll('.box');
                        let winningSquares = target[i];
                        
                        for (let i = 0; i < winningSquares.length; i++) {
                            let index = winningSquares[i];
                            squareList[index].style.backgroundColor = '#d35353';
                            console.log(squareList[index]);
                        }
                    }
                }

                const BUTTONSET = document.querySelector('.button-set');
                const REMATCH = document.createElement('button');
                const STARTOVER = document.createElement('button');

                REMATCH.textContent = 'Rematch';
                STARTOVER.textContent = 'Start Over';

                STARTOVER.addEventListener('click', () => {
                    player1.gameboard = [];
                    player2.gameboard = [];

                    win = false;

                    for (let i = 0; i < gameboard.length; i++) {
                        gameboard[i] = null;
                    }

                    clearContainer();
                    intro();
                });

                REMATCH.addEventListener('click', () => {
                    player1.gameboard = [];
                    player2.gameboard = [];

                    for (let i = 0; i < gameboard.length; i++) {
                        gameboard[i] = null;
                    };
                    
                    clearContainer();
                    render();
                });

                let children = BUTTONSET.children;
                for (let i = children.length - 1; i > -1; i--) {
                    children[i].remove();
                };

                BUTTONSET.appendChild(REMATCH);
                BUTTONSET.appendChild(STARTOVER);
            } else if (result === 'draw') {
                
            }
        })(result, playerArray, target);
    };

    function switchTeams() {
        if (currentTeam === player1) {
            return player2;
        } else {
            return player1;
        }
    }

    function clearContainer() {
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
    // debug

    function debug() {
        console.log(player1.gameboard);
        console.log(player2.gameboard);
    }

    return {
        debug,
    }
})();


