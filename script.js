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

    function makeMove(box) {
        const boxes = document.querySelectorAll('.box');
        
    }
})();

