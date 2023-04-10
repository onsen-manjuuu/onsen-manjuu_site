const stoneNum = 5
let stones = Array(stoneNum).fill(0);
const pile = document.querySelector('.pile')
const submit = document.querySelector('.submit');
const result = document.querySelector('.lastResult');
submit.addEventListener('click', round);
let resetButton;


function init() {
    select.disabled = false;
    number.disabled = false;
    stones = Array(stoneNum).fill(0);
    pile.textContent = '';
    for(let i = 0; i < stoneNum; i++) stones[i] = Math.floor(Math.random() * 15) + 1;
    for(let i = 0; i < stoneNum; i++) {
        pile.textContent += String(stones[i]);
        pile.textContent += ' ';
    }
}

function disp() {
    pile.textContent = '';

    for(let i = 0; i < stoneNum; i++) {
        pile.textContent += String(stones[i]);
        pile.textContent += ' ';
    }
}

function round() {
    let pos = Number(select.value);
    let num = Number(number.value);
    pos--;
    if(num > stones[pos]) {
        alert("数が大きすぎます");
        return;
    }
    stones[pos] -= num;
    disp();

    let xsum = 0;
    let fin = -1;
    for(let i = 0; i < stoneNum; i++) {
        xsum = xsum ^ stones[i];
        if(stones[i] > 0) fin = i;
    }

    let md = 0;
    let seen = false;
    for(let i = 0; i < 30; i++) if((1<<i) & xsum) md = i;

    if(fin == -1) {
        seen = true;
    } else if(xsum != 0) {
        console.log(stones);
        for(let i = 0; i < stoneNum; i++) {
            
            if((1<<md) & stones[i]) {
                stones[i] = xsum ^ stones[i];
                break;
            }
        }

    } else {
        let toru =  Math.floor(Math.random() * stones[fin]) + 1;
        stones[fin] -= toru;
    }
    
    disp();

    if(Math.max(...stones) == 0) {
        setGameOver();
        if(seen)youWin();
        if(!seen)youLose();

    }
}

function youWin() {
    result.textContent += "あなたの勝ちです";
}

function youLose() {
    result.textContent += "CPUの勝ちです";
}

function setGameOver() {
    select.disabled = true;
    number.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = '新しいゲームを始める';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

function resetGame() {
    init();
    const resetParas = document.querySelectorAll('.resultParas');
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }

}

init();