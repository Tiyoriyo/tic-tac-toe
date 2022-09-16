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
        [2, 4, 6]
    ];

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
            const INPUTSET = document.createElement('div');
            INPUTSET.style.display = 'flex';

            const P1DIV = document.createElement('div');
            P1DIV.style.display = 'flex';
            P1DIV.style.flexDirection = 'column';
            const P2DIV = document.createElement('div');
            P2DIV.style.display = 'flex';
            P2DIV.style.flexDirection = 'column';

            const P1LABEL = document.createElement('label');
            P1LABEL.textContent = 'Player 1 Name'
            const P1INPUT = document.createElement('input');
            P1DIV.appendChild(P1LABEL);
            P1DIV.appendChild(P1INPUT);

            const P2LABEL = document.createElement('label');
            P2LABEL.textContent = 'Player 2 Name';
            const P2INPUT = document.createElement('input');
            P2DIV.appendChild(P2LABEL);
            P2DIV.appendChild(P2INPUT);


            INPUTSET.appendChild(P1DIV);
            INPUTSET.appendChild(P2DIV);
            MAINCONTAINER.appendChild(INPUTSET);

            const BUTTONSET = document.createElement('div');
            BUTTONSET.style.display = 'flex';

            const CONFIRM = document.createElement('button');
            CONFIRM.textContent = 'Confirm';

            const BACK = document.createElement('button');
            BACK.textContent = 'Back';

            BUTTONSET.appendChild(CONFIRM);
            BUTTONSET.appendChild(BACK);
            MAINCONTAINER.appendChild(BUTTONSET);
        }
        
    }

    intro();

    function render() {
        const CONTAINER = document.createElement('div');
        CONTAINER.className = 'container';

        const CANVAS = document.createElement('div');
        CANVAS.className = 'canvas';

        const GAMETITLE = document.createElement('h1');
        GAMETITLE.textContent = 'Tic-Tac-Toe'
        GAMETITLE.className = 'game-title';
        
        CONTAINER.appendChild(CANVAS);
        MAINCONTAINER.appendChild(GAMETITLE);
        MAINCONTAINER.appendChild(CONTAINER);
        
        let i = 0;
        
        gameboard.forEach(() => {
            const BOX = document.createElement('div'); 

            BOX.style.width = '1fr';
            BOX.style.height = '1fr';
            BOX.className = 'box';
            BOX.setAttribute('id', `${i}`);
            i++;
            CANVAS.appendChild(BOX);
        });
    };

})();


