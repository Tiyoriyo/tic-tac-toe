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

    function render() {
        let container = document.querySelector('.container');
        let canvas = document.querySelector('.canvas');
        let i = 0;
        
        gameboard.forEach(() => {
            let box = document.createElement('div'); 

            box.style.width = '1fr';
            box.style.height = '1fr';
            box.className = 'box';
            box.setAttribute('id', `${i}`);
            i++;
            box.addEventListener('click', (e) => {
                makeMove(e.target);
            });
            canvas.appendChild(box);
        });
    };

    render();

    (function gameType() {
        let typeButtons = document.querySelectorAll('.buttons');
        let playerButton = document.querySelector('.button-1');
        let bottom = document.querySelector('.bottom');

        playerButton.addEventListener('click', () => {
            typeButtons.forEach(button => button.remove());
            let teamButtons = document.querySelectorAll('team-button')

            let teamX = document.createElement('button');
            let teamY = document.createElement('button');
            

            teamX.className = 'tX team-button';
            teamX.textContent = 'X';
            teamY.className = 'tY team-button';
            teamY.textContent = 'Y';

            teamX.addEventListener('click', () => {
                const PLAYER1 = new PLAYER('x');
                const PLAYER2 = new PLAYER(PLAYER1.enemy);
                console.log(PLAYER1);
                console.log(PLAYER2);
            });

            bottom.appendChild(teamX);
            bottom.appendChild(teamY);
            
        });
    })();

    const PLAYER = function(team) {
        this.team = team;
        this.enemy = (() => {
            if(team === 'x') {
                return 'y';
            } else {
                return 'x';
            }
        })();
    }

    function makeMove(box) {
        let boxNodePos = box.id;
        box.textContent = 'X';
        gameboard[boxNodePos] = 'X';
    }

    function switchTurnsComputer(type) {
        if(type === 'computer') {
            
        }
    }

    function makeYourMove() {
        let bottom = document.querySelector('.bottom');
        let div = document.createElement('div');
        div.textContent = 'Make Your Move!';
        bottom.appendChild(div);
    }

})();


