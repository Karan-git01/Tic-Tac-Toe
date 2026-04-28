// console.log("hi");
const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the Game 
function initGame(){
    gameGrid = ["","","","","","","","",""];
    currentPlayer = "X";
    boxes.forEach((box,index)=>{
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList = `box box-${index + 1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Switch Player
function swapTurn(){
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Event listener
function handleClick(index){
    if (gameGrid[index] == "") {
        boxes[index].style.pointerEvents = "none";
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        swapTurn();
        checkGameOver();
    }
}

function checkGameOver() {
  let result = "";
  winningPostions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[0]] === gameGrid[position[2]]
    ) {
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      if (gameGrid[position[0]] === "x") result = "X";
      else result = "Y";
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //  We Have A Winner
  if (result !== "") {
    gameInfo.innerText = `Winner Player - ${result}`;
    newGameBtn.classList.add("active");
    return;
  }
  let boardFilled = true;
  gameGrid.forEach((box) => {
    if (box === "") boardFilled = false;
  });
  // Board is filled, but game is tie
  if (boardFilled) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
    return;
  }
}

// adding event listeners
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});


initGame();

newGameBtn.addEventListener("click", initGame);