let board = [];

const table = document.getElementById("board");
const rows = table.getElementsByTagName("tr");
const tex = document.getElementById("outcome");
const tex2 = document.getElementById("outcome2");

for (let r = 0; r < rows.length; r++){
	const cells = rows[r].getElementsByTagName("td");
	let rowArray = [];
	for (let c = 0; c < cells.length; c++){
		rowArray.push(cells[c]);
	}
	board.push(rowArray);
}

let turn = false;
	
function doThing(x,y) {
	
	if (turn == false){
		board[x][y].innerHTML = "X";
		turn = true;
		tex.textContent = "O's Turn";
	} else {
		board[x][y].textContent = 'O';
		turn = false;
		tex.textContent = "X's Turn";
	}

	checkWin();
	if (checkBoard()){
		alert('ok');
	}
	
}


function clearer(){
	for (int i = 0; i < 3; i++){
			for (int j = 0; j < 3; j++){
				board[i][j].textContent = '';
			}
		}
}


function checkWin(){

	
	//toprow
	if (board[0][0].textContent != '' && board[0][0].textContent == board[0][1].textContent && board[0][0].textContent == board[0][2].textContent){
		alert('win');
		return;
	}
	//midrow
	else if (board[1][0].textContent != '' && board[1][0].textContent == board[1][1].textContent && board[1][0].textContent == board[1][2].textContent){
		alert('win');
		return;
	}
	//botrow
	else if (board[2][0].textContent != '' && board[2][0].textContent == board[2][1].textContent && board[2][0].textContent == board[2][2].textContent){
		alert('win');
		return;
	}
	//lcol
	else if (board[0][0].textContent != '' && board[0][0].textContent == board[1][0].textContent && board[0][0].textContent == board[2][0].textContent){
		alert('win');
		return;
	}
	//mcol
	else if (board[0][1].textContent != '' && board[0][1].textContent == board[1][1].textContent && board[0][1].textContent == board[2][1].textContent){
		alert('win');
		return;
	}
	//
	else if (board[0][2].textContent != '' && board[0][2].textContent == board[1][2].textContent && board[0][2].textContent == board[2][2].textContent){
		alert('win');
		return;
	}
	else if (board[0][0].textContent != '' && board[0][0].textContent == board[1][1].textContent && board[0][0].textContent == board[2][2].textContent){
		alert('win');
		return;
	}
	else if (board[2][0].textContent != '' && board[2][0].textContent == board[1][1].textContent && board[2][0].textContent == board[0][2].textContent){
		alert('win');
		return;
	}
	else{return;}
		
}

function checkBoard(){
	if (tl.textContent != '' && tm.textContent != '' && 
	tr.textContent != '' && ml.textContent != '' && 
	mm.textContent != '' && mr.textContent != '' && 
	bl.textContent != '' && bm.textContent != '' && 
	br.textContent != ''){
		return true;
	} else { return false;}
}
	
tl.addEventListener("click", () => doThing(0,0));
tm.addEventListener("click", () => doThing(0,1));
tr.addEventListener("click", () => doThing(0,2));
ml.addEventListener("click", () => doThing(1,0));
mm.addEventListener("click", () => doThing(1,1));
mr.addEventListener("click", () => doThing(1,2));
bl.addEventListener("click", () => doThing(2,0));
bm.addEventListener("click", () => doThing(2,1));
br.addEventListener("click", () => doThing(2,2));



