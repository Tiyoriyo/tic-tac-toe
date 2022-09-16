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
                GAMETITLE.remove();
                BUTTONSET.remove();
                render();
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

        
    }

    intro();

    function render() {
        const CONTAINER = document.createElement('div');
        CONTAINER.className = 'container';

        const CANVAS = document.createElement('div');
        CANVAS.className = 'canvas';
        
        CONTAINER.appendChild(CANVAS);
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


