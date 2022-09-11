const GAMEBOARD = (function() {
    let gameboard = ['x', 'o', null, null, null, null, null, null, null];

    function render() {
        let container = document.querySelector('.container');
        let canvas = document.querySelector('.canvas');
        
        gameboard.forEach(function(square) {
            createBox(square);
        });

        function createBox(value) {
            let box = document.createElement('div');
            let boxWidth = container.offsetWidth / 3;
            let boxHeight = container.offsetHeight / 3;
            

            if (value === 'x') {
                box.textContent = 'X';
                box.style.width = '1fr';
                box.style.height = '1fr';
                box.className = 'box';
                canvas.appendChild(box);
            } else if (value === 'o') {
                box.textContent = 'O';
                box.style.width = '1fr';
                box.style.height = '1fr';
                box.className ='box';
                canvas.appendChild(box);
            } else {
                box.style.width = '1fr';
                box.style.height = '1fr';
                box.className = 'box';
                canvas.appendChild(box);
            }
        }
    };

    render();

})();

