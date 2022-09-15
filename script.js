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

            let teamX = document.createElement('button');
            let teamY = document.createElement('button');
            

            teamX.className = 'tX team-button';
            teamX.textContent = 'X';
            teamY.className = 'tY team-button';
            teamY.textContent = 'Y';

            teamX.addEventListener('click', () => {
                let teamButtons = document.querySelectorAll('.team-button')
                const PLAYER1 = new PLAYER('x', 'Player 1');
                const PLAYER2 = new PLAYER('y', 'Player 2');
                console.log(PLAYER1);
                console.log(PLAYER2);

                teamButtons.forEach(button => button.remove());
            });


            bottom.appendChild(teamX);
            bottom.appendChild(teamY);
            
        });
    })();

    const PLAYER = function(team, name) {
        this.team = team;
        this.name = name;
    }

    function makeMove(box) {
        let boxNodePos = box.id;
        box.textContent = 'X';
        gameboard[boxNodePos] = 'X';
    }

})();


