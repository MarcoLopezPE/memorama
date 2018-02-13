var audioCorrect = new Audio('sounds/correct.mp3');
var audioIncorrect = new Audio('sounds/incorrect.mp3');

var memoryArray = ['A', 'A',
                    'B', 'B',
                    'C', 'C',
                    'D', 'D',
                    'E', 'E',
                    'F', 'F',
                    'G', 'G',
                    'H', 'H',
                    'I', 'I',
                    'J', 'J',
                    'K', 'K',
                    'L', 'L'];
var memoryValues = [];
var memoryTileIDs = [];
var memoryNumbers = [];
var tilesFlipped = 0;

Array.prototype.memoryTileShuffle = function () {
    var i = this.length, j , temp;
    while(--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

function newBoard() {
    tilesFlipped = 0;
    var output = '';
    memoryArray.memoryTileShuffle();
    for (var i = 0; i < memoryArray.length; i++) {
        output +=   '<div id="tile'+ i + '" onclick="memoryFlipTile(this, \'' + memoryArray[i] + '\')" class="ficha hvr-grow">' +
                        (i + 1) +
                    '</div>';
    }
    document.getElementById('memoryBoard').innerHTML = output;
}

function memoryFlipTile(tile, val) {
    // Si la ficha no ha sido volteada y la cantidad de fichas voltedas es menor a 2
    if (memoryValues.length < 2) {
        tile.style.background = 'url(avatars/' + val + '.png)';
        tile.style.backgroundSize = '240px 240px';
        var innerDiv = tile.innerHTML;
        tile.innerHTML = "";

        // Si no hay fichas volteadas
        if (memoryValues.length == 0) {
            memoryValues.push(val);
            memoryTileIDs.push(tile.id);
            memoryNumbers.push(innerDiv);

        // Si hay solo una ficha volteada y la ficha que ha sido volteada es diferente a la siguiente volteada
        // Esto es a raiz de hacer dos veces clic a una misma ficha
        } else if (memoryValues.length == 1 && memoryTileIDs[0] != tile.id) {
            memoryValues.push(val);
            memoryTileIDs.push(tile.id);
            memoryNumbers.push(innerDiv);

            // Comparando la igualdad de la primera ficha volteada con la segunda volteada
            if (memoryValues[0] == memoryValues[1]) {
                // Aumentamos el numero de fichas volteadas + 2
                tilesFlipped += 2;
                // Creamos los valores, ya que si hay iguales, debemos desabilitarlos
                // o quitarles la opcion de hacer clic en ellos
                var tile1 = document.getElementById(memoryTileIDs[0]);
                var tile2 = document.getElementById(memoryTileIDs[1]);
                tile1.removeAttribute("onclick");
                tile2.removeAttribute("onclick");
                tile1.classList.remove("hvr-grow");
                tile2.classList.remove("hvr-grow");
                // Limpiamos los valores de fichas volteadas en ese momento
                // Comunmente deben tener maximo 2, ya que siempre se voltea de 2 en 2
                memoryValues = [];
                memoryTileIDs = [];
                memoryNumbers = [];
                // Si es correcto, entonces sonido de Correcto
                audioCorrect.play();
                // Comparamos el total de Fichas volteadas con el total de fichas
                // Si son iguales, se limpia o se muestra un mensaje
                if (tilesFlipped == memoryArray.length) {
                    setTimeout(700);
                    //alert("Board cleared... generating new board");
                    //document.getElementById('memoryBoard').innerHTML = "";
                    //newBoard();
                }

            } else {
                // Como no son iguales, sonido de incorrecto
                audioIncorrect.play();
                function flip2Back() {
                    // Declaramos la variables para las 2 fichas volteadas
                    var tile1 = document.getElementById(memoryTileIDs[0]);
                    var tile2 = document.getElementById(memoryTileIDs[1]);
                    // Les decimos a las fichas que se volteen o tengan nuevamente
                    // el fondo o imagen inicial
                    tile1.style.background = "url('avatars/tile-bg.png') no-repeat";
                    tile1.style.backgroundSize = "240px";
                    tile1.innerHTML = memoryNumbers[0];
                    tile2.style.background = "url('avatars/tile-bg.png') no-repeat";
                    tile2.style.backgroundSize = "240px";
                    tile2.innerHTML = memoryNumbers[1];
                    // Limpiamos lo arreglos
                    memoryValues = [];
                    memoryTileIDs = [];
                    memoryNumbers = [];
                }
                // Hacemos un tiempo de 0.7 segundos y ejecutamos la funcion anterior
                setTimeout(flip2Back, 700);
            }

        }

    }
}
