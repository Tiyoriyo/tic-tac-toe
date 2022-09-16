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
            canvas.appendChild(box);
        });
    };

})();


