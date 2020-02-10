
const root = document.getElementById('root')
const state = {
	boardMatrix: [
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,-1,1,0,0,0],
		[0,0,0,1,-1,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0]
	],
	// userPoints: [[], []],
	actualTurn: 1
}
function getDiagonalsRight(m) {
  let s, x, y, d,
      o = [];
  for (s = 0; s < m.length; s++) {
    d = [];
    for(y = s, x = 0; y >= 0; y--, x++)
      d.push(m[y][x]);
    o.push(d);
  }
  for (s = 1; s < m[0].length; s++) {
    d = [];
    for(y = m.length - 1, x = s; x < m[0].length; y--, x++)
      d.push(m[y][x]);
    o.push(d);
  }
  return o;
}


const othelloCase = () => {
	const othellocase = document.createElement("div")
	const cell = document.createElement("div")
	othellocase.appendChild(cell)
	othellocase.style.display = 'inline-block'
	othellocase.style.background = '#0ce3ac'
	othellocase.style.width = '100px'
	othellocase.style.borderTop = '5px solid green'
	othellocase.style.borderBottom = '5px solid green'
	othellocase.style.borderLeft = '2.5px solid green'
	othellocase.style.borderRight = '2.5px solid green'
	othellocase.style.height = '100px'
	cell.style.width = '95px'
	cell.style.height = '95px'
	cell.style.borderRadius = '50%'
	return othellocase
}

const render = (mount, state) => {
	let { boardMatrix, actualTurn } = state
	const board = document.createElement("div")

	mount.appendChild(board)
	board.style.width = '80%'
	const allCells = boardMatrix.map((row, rowIndex) => {
		const boardRow = document.createElement("div")
		cellsRow = row.map((boardState, columnIndex) => {
			const cell = othelloCase()
			board.appendChild(boardRow)
			boardRow.style.height = '100px'
			boardRow.appendChild(cell)
			return cell
		})
		return cellsRow
	})
	allCells.forEach((rowArray, rowIndex) => {
		rowArray.forEach((othellocase, columnIndex) => {
			const cell = othellocase.firstChild
			cell.style.display = (boardMatrix[rowIndex][columnIndex] != 0) ? 'block' : 'none'
			othellocase.style.cursor = 'pointer'
			othellocase.onclick = () => {

				othellocase.style.cursor = 'default'
				cell.style.background =  (actualTurn == 1) ? 'black' : 'white'
				cell.style.display = 'block'
				let leftDifference = _.range(columnIndex)
				let rightDifference = _.range(columnIndex + 1, 8)
				let upDifference = _.range(rowIndex)
				let downDifference = _.range(rowIndex + 1, 8)
				let catchLeft = leftDifference.some((column) => boardMatrix[rowIndex][column] == actualTurn)
				let catchRight = rightDifference.some((column) => boardMatrix[rowIndex][column] == actualTurn)
				let catchUp = upDifference.some((row) => boardMatrix[row][columnIndex] == actualTurn)
				let catchDown = downDifference.some((row) => boardMatrix[row][columnIndex] == actualTurn)
				let emptySpaces = false
				if (catchLeft) {
					const firstLeft = leftDifference.reverse().find(column => boardMatrix[rowIndex][column] == actualTurn)
					console.log(firstLeft)
					_.range(firstLeft + 1, columnIndex).forEach((column) => {if(boardMatrix[rowIndex][column] == 0 && !emptySpaces) emptySpaces = !emptySpaces})
					_.range(firstLeft + 1, columnIndex).forEach((column) => {
						if(boardMatrix[rowIndex][column] != actualTurn && boardMatrix[rowIndex][column] != 0 && !emptySpaces){
							boardMatrix[rowIndex][column] = actualTurn
							allCells[rowIndex][column].firstChild.style.display = 'block'
							allCells[rowIndex][column].firstChild.style.background = (actualTurn == 1) ? 'black' : 'white'
						}
					})
					emptySpaces = false
				}
				if (catchRight) {
					const firstRight = rightDifference.find(column => boardMatrix[rowIndex][column] == actualTurn)
					_.range(columnIndex + 1, firstRight).forEach((column) => {if(boardMatrix[rowIndex][column] == 0 && !emptySpaces) emptySpaces = !emptySpaces})
					_.range(columnIndex + 1, firstRight).reverse().forEach((column) => {
						if(boardMatrix[rowIndex][column] != actualTurn && boardMatrix[rowIndex][column] != 0 && !emptySpaces){
							boardMatrix[rowIndex][column] = actualTurn
							allCells[rowIndex][column].firstChild.style.display = 'block'
							allCells[rowIndex][column].firstChild.style.background = (actualTurn == 1) ? 'black' : 'white'
						}
					})
					emptySpaces = false
				}
				if (catchUp) {
					const firstUp = upDifference.reverse().find(row => boardMatrix[row][columnIndex] == actualTurn)
					_.range(firstUp + 1, rowIndex).forEach((row) => {if(boardMatrix[row][columnIndex] == 0 && !emptySpaces) emptySpaces = !emptySpaces})
					_.range(firstUp + 1, rowIndex).forEach((row) => {
						if(boardMatrix[row][columnIndex] != actualTurn && boardMatrix[row][columnIndex] != 0 && !emptySpaces){
							boardMatrix[row][columnIndex] = actualTurn
							allCells[row][columnIndex].firstChild.style.display = 'block'
							allCells[row][columnIndex].firstChild.style.background = (actualTurn == 1) ? 'black' : 'white'
						}
					})
					emptySpaces = false
				}
				if (catchDown) {
					const firstDown = downDifference.find(row => boardMatrix[row][columnIndex] == actualTurn)
					_.range(rowIndex + 1, firstDown).forEach((row) => {if(boardMatrix[row][columnIndex] == 0 && !emptySpaces) emptySpaces = !emptySpaces})
					_.range(rowIndex + 1, firstDown).forEach((row) => {
						if(boardMatrix[row][columnIndex] != actualTurn && boardMatrix[row][columnIndex] != 0 && !emptySpaces){
							boardMatrix[row][columnIndex] = actualTurn
							allCells[row][columnIndex].firstChild.style.display = 'block'
							allCells[row][columnIndex].firstChild.style.background = (actualTurn == 1) ? 'black' : 'white'
						}
					})
					emptySpaces = false
				}

				boardMatrix[rowIndex][columnIndex] = actualTurn
				actualTurn *= -1
				othellocase.style.pointerEvents = "none"
			}

			if (boardMatrix[rowIndex][columnIndex] != 0) {
				cell.style.background = (boardMatrix[rowIndex][columnIndex] == 1) ? 'black' : 'white'
				othellocase.style.pointerEvents = "none"
			}

		})
	})
}

render(root, state)