const GAMEBOARD = (function() {
    let gameboard = [
        null, null, null,
         null, null, null,
          null, null, null
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

            let teamX = document.createElement('button');
            let teamY = document.createElement('button');
            

            teamX.className = 'tX';
            teamX.textContent = 'X';
            teamY.className = 'tY';
            teamY.textContent = 'Y';

            bottom.appendChild(teamX);
            bottom.appendChild(teamY);
            
        });
    })();

    const Player = function() {

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


