const GAMEBOARD = (function() {

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

            });
            BUTTONSET.appendChild(TWOPLAYER);

            const COMPUTER = document.createElement('button');
            COMPUTER.textContent = 'Computer';
            COMPUTER.className = 'intro-btn computer-btn';
            COMPUTER.addEventListener('click', () => {

            });
            BUTTONSET.appendChild(COMPUTER);

            const MAINCONTAINER = document.querySelector('.main-container');
            MAINCONTAINER.appendChild(GAMETITLE);
            MAINCONTAINER.appendChild(BUTTONSET);
        })();
    }

    intro();

    function render() {
        let canvas = document.querySelector('.canvas');
        let i = 0;
        
        gameboard.forEach(() => {
            let box = document.createElement('div'); 

            box.style.width = '1fr';
            box.style.height = '1fr';
            box.className = 'box';
            box.setAttribute('id', `${i}`);
            i++;
            canvas.appendChild(box);
        });
    };

})();


