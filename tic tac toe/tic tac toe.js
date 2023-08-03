const X_CLASS ='x';
const CIRCLE_CLASS = 'circle';

const WINNING_COMBINATIONS = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
	]



let circleTurn;
let xTurn;

// выбираем все клетки нашего поля
const cellElements = document.querySelectorAll('[data-cell]');

// получаем класс(ы) нашего поля, для дальнейшей работы
const board = document.getElementById('board');

// получвем класс(ы) пободного сообщения
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

// создание кнопки restsrt
const restartButtom = document.getElementById('restartButton')
// проверяем, кликают ли на наши клитки и делаем с ними чтото при надатии с помощью
// функции handleclick

startGame();

restartButtom.addEventListener('click',startGame)
// функция которая расставляет приоритеты в начале игры  и запускает ее
function startGame(){
	circleTurn = false;
	xTurn = true;

	cellElements.forEach(cell => {
		cell.classList.remove(X_CLASS)
		cell.classList.remove(CIRCLE_CLASS)
		cell.removeEventListener('click', handleClick)
		cell.addEventListener('click', handleClick, {once: true})
	})

	setBoardHoverClass();
	winningMessageElement.classList.remove('show')
}


function handleClick(event){
	let cell = event.target;
	let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
	placeMark(cell,currentClass)

	if (checkWin(currentClass)) {
		endGame(false);

	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTruns();
		setBoardHoverClass();
	}



}

// ставим фигруру соответствующую ходу игрока и меняем ход игроков

function placeMark(cell, currentClass){
	cell.classList.add(currentClass);
}


function swapTruns(){
	circleTurn = !circleTurn;
	xTurn = !xTurn;
}


// позволяет показывать фигуру при навидении на клетку, в ход текущего игрока

function setBoardHoverClass(){
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);

	if (circleTurn){
		board.classList.add(CIRCLE_CLASS);
	}

	else if (xTurn){
		board.classList.add(X_CLASS);
	}
}

// проверка на победителя, если имеется 1 любая комбинация
function checkWin(currentClass){
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})

}


// вывод сообщения при победе

function endGame(draw){
	if (draw) {
		winningMessageTextElement.innerText = "Draw"
	}
	else {
		// проверка существует ли элемент winningMessageTextElement
		if(winningMessageTextElement){
			winningMessageTextElement.innerText = `${circleTurn ? "O" : 'X'} winner!`;
		}
		else{
			console.log('winningMessageTextElement not exist')
		}
		
	}
	winningMessageElement.classList.add('show');

}

function isDraw(){
	return [...cellElements].every(cell => {
		return cell.classList.contains(X_CLASS) ||
		cell.classList.contains(CIRCLE_CLASS)
	})
}