const GAMEBOARD = (function() {
    let gameboard = ['x', 'o', null, null, null, null, null, null, null];

    function render() {
        let canvas = document.querySelector('.container');
        let boxWidth = 500 / 3;
        let boxHeight = 500 / 3;

        gameboard.forEach(function(square) {
            let box = document.createElement('div');
            if (square === 'x') {
                box.textContent = 'X';
                box.style.width = boxWidth + 'px';
                box.style.height = boxHeight + 'px';
                canvas.appendChild(box);
            } else if (square === 'o') {
                box.textContent = 'O';
                box.style.width = boxWidth + 'px';
                box.style.height = boxHeight + 'px';
                canvas.appendChild(box);
            }
        })
    };

    render();

})();

