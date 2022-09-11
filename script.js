const GAMEBOARD = (function() {
    let gameboard = ['x', 'o', null, null, null, null, null, null, null];

    function render() {
        let container = document.querySelector('.container');
        let canvas = document.querySelector('.canvas');
        let boxWidth = container.offsetWidth / 3;
        let boxHeight = container.offsetHeight / 3;

        gameboard.forEach(function(square) {
            createBox(square);
        })

        function createBox(value) {
            let box = document.createElement('div');
            if (value === 'x') {
                box.textContent = 'X';
                box.style.width = boxWidth + 'px';
                box.style.height = boxHeight + 'px';
                canvas.appendChild(box);
            } else if (value === 'o') {
                box.textContent = 'O';
                box.style.width = boxWidth + 'px';
                box.style.height = boxHeight + 'px';
                canvas.appendChild(box);
            } else {
                box.style.width = boxWidth + 'px';
                box.style.height = boxHeight + 'px';
                canvas.appendChild(box);
            }
        }
    };

    render();

})();

