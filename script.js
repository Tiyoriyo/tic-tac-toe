const GAMEBOARD = (function() {
    let gameboard = [
        null, null, null,
         null, null, null,
          null, null, null
        ];

    function render() {
        let container = document.querySelector('.container');
        let canvas = document.querySelector('.canvas');
        
        gameboard.forEach(function(square) {
            createBox(square);
        });

        function createBox(value) {
            let box = document.createElement('div');        
            box.style.width = '1fr';
            box.style.height = '1fr';
            box.className = 'box';
            canvas.appendChild(box);
        }
    };

    render();

    function makeMove() {

    }
})();

