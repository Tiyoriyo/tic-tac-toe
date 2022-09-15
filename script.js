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

    (function gameType() {
        let buttons = document.querySelectorAll('.buttons');
        let computerButton = document.querySelector('.button-1');
        let playerButton = document.querySelector('.button-2');

        computerButton.addEventListener('click', () => {
            buttons.forEach(button => button.remove());
        });
    })();

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
        let div = document.createElement('div');
    }

    return {
        render,
    }
})();

GAMEBOARD.render();

