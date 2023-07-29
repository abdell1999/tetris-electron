# Documentación de Funciones del Juego Tetris

## createPiece(type)
Esta función toma una cadena `type` como argumento, que corresponde a uno de los tipos de piezas en Tetris ('I', 'J', 'L', 'O', 'S', 'T', 'Z'). Devuelve un objeto que representa una pieza Tetris de ese tipo, inicialmente en su primera rotación.

## drawPiece(piece, offset)
Esta función toma un objeto `piece` y un objeto `offset` como argumentos. Dibuja la pieza en el contexto de canvas especificado en la posición dada por el offset.

## merge(board, player)
Esta función toma el tablero de juego actual y el jugador actual como argumentos. Combina la pieza actual del jugador con el tablero de juego, efectivamente colocando la pieza en el tablero.

## collide(board, player)
Esta función toma el tablero de juego actual y el jugador actual como argumentos. Verifica si la pieza actual del jugador colisiona con otras piezas en el tablero o con los bordes del tablero.

## rotate(piece)
Esta función toma un objeto `piece` como argumento y devuelve una nueva pieza que es una rotación de la pieza original.

## createBoard(width, height)
Esta función toma un `width` (ancho) y un `height` (alto) como argumentos y crea una nueva matriz 2D llena de ceros que representa un nuevo tablero de juego vacío.

## drawBoard(board)
Esta función toma una matriz `board` que representa un tablero de juego y dibuja este tablero en el contexto de canvas especificado.

## update()
Esta función es el bucle principal de juego. Dibuja el tablero de juego y la pieza actual del jugador.

## playerReset()
Esta función reinicia la posición y la pieza del jugador a sus valores iniciales.

## playerMove(dir)
Esta función toma una dirección `dir` como argumento. Mueve la pieza del jugador en esa dirección si es posible (es decir, si no causaría una colisión).

## playerDrop()
Esta función mueve la pieza del jugador hacia abajo en el tablero. Si esto causa una colisión, entonces la pieza del jugador se fusiona con el tablero y el jugador obtiene una nueva pieza.

## playerRotate(dir)
Esta función toma una dirección `dir` como argumento. Rota la pieza del jugador en esa dirección si es posible (es decir, si no causaría una colisión).

## removeCompletedRows(board)
Esta función toma una matriz `board` que representa un tablero de juego y elimina todas las filas completas de este tablero, desplazando todas las filas superiores hacia abajo y agregando nuevas filas vacías en la parte superior.
