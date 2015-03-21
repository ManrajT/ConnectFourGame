{\rtf1\ansi\ansicpg1252\cocoartf1265\cocoasubrtf210
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww10800\viewh10720\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural

\f0\fs24 \cf0 //Creating canvas\
var canvas = document.createElement("canvas");\
var ctx = canvas.getContext("2d");\
canvas.width = canvas.height = 400;\
document.body.appendChild(canvas);\
\
var boardHeight = 10;\
var boardWidth = 10;\
\
var player1Colour = "red";\
var player2Colour = "blue";\
var font = "30px Arial";\
var milliUpdateSpeed = 50;\
\
\
function init() \{\
    var sqrWidth = canvas.width / boardWidth;\
    var sqrHeight = canvas.height / boardHeight;\
    var moves = 0;\
\
    function Board(width, height) \{\
        var twoDimArray = [];\
        for (var i = 0; i < height; i++) \{\
            var oneDimArray = [];\
            for (var j = 0; j < width; j++) \{\
                oneDimArray[j] = 0;\
            \}\
            twoDimArray[i] = oneDimArray;\
        \}\
        this.width = width;\
        this.height = height;\
        this.getPiece = function (i, j) \{\
            if (0 <= i && i < boardHeight && 0 <= j && j < boardWidth) return twoDimArray[i][j];\
            else throw "chosen piece is off range of board";\
        \}\
        this.setPiece = function (i, j, type) \{\
            if (type === 0 || type === 1 || type === 2) \{\
                if (0 <= i && i < boardHeight && 0 <= j && j < boardWidth) \{\
                    twoDimArray[i][j] = type;\
                \} else throw "chosen piece is off range of board";\
            \} else \{\
                throw "No piece corresponding with that type";\
            \}\
        \}\
    \}\
\
    function renderBoard(board) \{\
\
        function renderCircle(i, j, colour) \{\
            ctx.beginPath();\
            radius = Math.min(sqrWidth, sqrHeight) / 2;\
            i_center = i * sqrHeight + 0.5 * sqrHeight;\
            j_center = j * sqrWidth + 0.5 * sqrWidth;\
            ctx.arc(j_center, i_center, radius, 0, 2 * Math.PI);\
            ctx.stroke();\
            ctx.fillStyle = colour;\
            ctx.fill();\
            ctx.closePath();\
        \}\
\
        function renderSquare(i, j) \{\
            ctx.rect(j * sqrWidth, i * sqrHeight, j * sqrWidth + sqrWidth, i * sqrHeight + sqrHeight);\
            ctx.strokeStyle = "black";\
            ctx.stroke();\
        \}\
\
        for (var i = 0; i < board.height; i++) \{\
            for (var j = 0; j < board.width; j++) \{\
                renderSquare(i, j);\
                var piece = board.getPiece(i, j);\
\
                if (piece === 0) \{\} else if (piece === 1) \{\
                    renderCircle(i, j, player1Colour);\
                \} else if (piece === 2) \{\
                    renderCircle(i, j, player2Colour);\
                \}\
            \}\
        \}\
    \}\
\
\
    function nextAvailRow(j) \{\
        //will never return a 0....\
        for (var i = (boardHeight - 1); i > -1; i--) \{\
            if (i === 0) \{\}\
            if (board.getPiece(i, j) === 0) return i;\
        \}\
        return null;\
    \}\
\
    function player1Input() \{\
        //hard-coded to give random inputs\
        var input = Math.round(Math.random() * (boardWidth - 1));\
        return input;\
    \}\
\
    function player2Input() \{\
        //hard-coded to give random inputs\
        var input = Math.round(Math.random() * (boardWidth - 1));\
        return input;\
    \}\
\
    function printText(text) \{\
        var textPosX = canvas.width / 4;\
        var textPosY = canvas.width / 15;\
\
        ctx.font = font;\
        ctx.fillStyle = "yellow";\
        ctx.strokeStyle = "black";\
        ctx.fillText(text, textPosX, textPosY);\
        ctx.strokeText(text, textPosX, textPosY);\
\
    \}\
\
    function checkDraw(board) \{\
        if (moves >= (boardWidth * boardHeight)) \{\
            renderBoard(board);\
            printText("Draw");\
            clearInterval(gameLoopHandler);\
        \}\
    \}\
\
    function checkWin(i, j, type, board) \{\
\
        function horizontalWin() \{\
            var horizontalCount = 0;\
            for (var z = 0; z < board.width; z++) \{\
                if (board.getPiece(i, z) === type) \{\
                    console.log(board.getPiece(i, z));\
                    horizontalCount++;\
                \} else \{\
                    horizontalCount = 0;\
                \}\
\
                if (horizontalCount > 3) return true;\
            \}\
            return false;\
        \}\
\
        function verticalWin() \{\
            var verticalCount = 0;\
            for (var z = 0; z < board.height; z++) \{\
                if (board.getPiece(z, j) === type) \{\
                    verticalCount++;\
                \} else \{\
                    verticalCount = 0;\
                \}\
\
                if (verticalCount > 3) return true;\
            \}\
            return false;\
        \}\
\
        function angleWin() \{\
            var angleCount = 0;\
            var i_check = i;\
            var j_check = j;\
            while ((0 < i_check) && (0 < j_check)) \{\
                i_check--;\
                j_check--;\
            \}\
            for (;\
            (i_check < board.height) && (j_check < board.width); i_check++, j_check++) \{\
                console.log("for loop is running");\
                if (board.getPiece(i_check, j_check) === type) \{\
                    angleCount++;\
                \} else \{\
                    angleCount = 0;\
                \}\
\
                if (angleCount > 3) return true;\
            \}\
            var angleCount = 0;\
            var i_check = i;\
            var j_check = j;\
            while ((0 < i_check) && (j_check < board.width)) \{\
                i_check--;\
                j_check++;\
            \}\
            for (;\
            (i_check < board.height) && (0 <= j_check); i_check++, j_check--) \{\
                console.log("second for loop is running");\
                if (board.getPiece(i_check, j_check) === type) \{\
                    angleCount++;\
                \} else \{\
                    angleCount = 0;\
                \}\
\
                if (angleCount > 3) return true;\
            \}\
            return false;\
        \}\
\
        if (verticalWin() || horizontalWin() || angleWin()) \{\
            renderBoard(board);\
            printText("Player " + type + " has won");\
            clearInterval(gameLoopHandler);\
        \}\
\
    \}\
\
    function gameLoop(board) \{\
        moves++;\
        var chosenColumn;\
        var availRow;\
\
\
        renderBoard(board);\
        checkDraw(board);\
\
        if (moves % 2 === 1) \{\
            do \{\
                chosenColumn = player1Input();\
                availRow = nextAvailRow(chosenColumn);\
            \} while (availRow === null);\
\
            board.setPiece(availRow, chosenColumn, 1);\
            checkWin(availRow, chosenColumn, 1, board);\
\
        \} else if (moves % 2 === 0) \{\
            do \{\
                chosenColumn = player2Input();\
                availRow = nextAvailRow(chosenColumn);\
            \}\
            while (availRow === null);\
\
            board.setPiece(availRow, chosenColumn, 2);\
            checkWin(availRow, chosenColumn, 2, board);\
        \}\
\
    \}\
    var board = new Board(boardWidth, boardHeight);\
\
    gameLoopHandler = setInterval(function () \{\
        gameLoop(board)\
    \}, milliUpdateSpeed);\
\}\
\
init();}