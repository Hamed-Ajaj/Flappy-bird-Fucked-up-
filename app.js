// const block = document.getElementById('block');
// const hole = document.getElementById('hole');
// const character = document.getElementById('character');
// let jumping = 0;
// let counter = 0;
// let starting = false;
// const startScreen = document.querySelector('.game-start');
// const start = document.getElementById('start');
// const score = document.getElementById('score');
// const restart = document.getElementById('restart');
// let gameOver = false;
// const gameOverMenu = document.querySelector('.game-over');

// restart.addEventListener('click', () => {
//     gameOver = false
//     gameOverMenu.classList.remove('show');
//     gameStart();
// })
// start.addEventListener('click', () => {
//     starting= true
//     startScreen.classList.remove('show');
//     gameStart();
// })

// const gameStart = () =>{
//     if(starting){
//         window.addEventListener('mousedown', () =>{
//             jump();
//         })
//         startAnimation();
//         hole.addEventListener('animationiteration', () =>{
//             const random = -((Math.random() * 300)+180);
//             hole.style.top = random+'px'
//             counter++;
//             score.innerHTML = counter;
//         })
        
//         setInterval(function(){
//             var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
//             if(jumping==0){
//                 character.style.top = (characterTop+3)+"px";
//             }
//             var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
//             var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
//             var cTop = -(590-characterTop);
//             if((characterTop>565)||((blockLeft<40)&&(blockLeft>-50)&&((cTop<holeTop-10)||(cTop>holeTop+130)))){
//                 gameOver = true;
//                 character.style.top = 100 + "px";
//                 counter=0;
//             }
//         },10);
//     }
//     else{
//         gameOverFun()
//     }
// }
// const startAnimation = () =>{
//     if(starting){
//         hole.classList.add('animate');
//         block.classList.add('animate');
//     }
//     else{
//         gameOverFun()
//     }
// }

// const gameOverFun = () =>{
//   if(gameOver){
//     gameOverMenu.classList.add('show');
//     hole.classList.remove('animate');
//     block.classList.remove('animate');
//     hole.style.top = 100+'px';
//     block.style.left = 100+'px';
//     character.style.top = 100+'px';
//     score.innerHTML = 0;
//   }
//   else{
//         gameOverMenu.classList.add('show');
//   }
// }


// function jump(){
//     jumping=1;
//     let jumpCount =0;
//     const jumpInterval = setInterval(() =>{

//         let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))

//         if(characterTop>6 && (counter<15))  character.style.top = (characterTop - 4) +"px"

//         if(jumpCount>20){
//             clearInterval(jumpInterval)
//             jumping=0;
//             jumpCount=0
//         }
//         jumpCount++;
//     },10)
// }

const block = document.getElementById('block');
const hole = document.getElementById('hole');
const character = document.getElementById('character');
let jumping = 0;
let counter = 0;
let starting = false;
const startScreen = document.querySelector('.game-start');
const startButton = document.getElementById('start'); // Renamed from 'start' to 'startButton'
const score = document.getElementById('score');
const finalScore = document.getElementById('final-score'); // To show the final score
const restart = document.getElementById('restart');
let gameOver = false;
const gameOverMenu = document.querySelector('.game-over');
const gameOverMessage = document.querySelector('.game-over-message'); // To show the game over message

startScreen.addEventListener('click', () => {
    startGame(); // Renamed from gameStart() to startGame()
});

const startGame = () => {
    starting = true;
    startScreen.classList.remove('show');
    gameLoop(); // Renamed from startAnimation() to gameLoop()
};
restart.addEventListener('click', (e) => {
    e.preventDefault();
   window.location.reload(); // Reload the page when restart button is clicked
})

const gameLoop = () => {
    if (starting || !gameOver) {
        window.addEventListener('mousedown', () => {
            if(!gameOver)
                jump();
        });

        startAnimation()

        hole.addEventListener('animationiteration', () => {
            const random = -((Math.random() * 300) + 180);
            hole.style.top = random + 'px';
            counter++;
            score.innerHTML = counter;
        });

        const loopInterval = setInterval(() => {
            if (gameOver) {
                clearInterval(loopInterval); // Stop the loop when game over
                return;
            }

            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            if (jumping == 0) {
                character.style.top = (characterTop + 3) + "px";
            }

            let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
            let cTop = -(590 - characterTop);

            if ((characterTop > 565) || ((blockLeft < 40) && (blockLeft > -50) && ((cTop < holeTop - 10) || (cTop > holeTop + 130)))) {
                gameOverFun();
                character.style.top = 100 + "px";
                counter = 0;
            }
        }, 10);
    }
};

const gameOverFun = () => {
    starting = false;
    gameOver = true;
    gameOverMenu.classList.add('show'); // Corrected to add() instead of = sign
    finalScore.innerHTML = "score : " + counter; // To show the final score
    stopAnimation()
};

function jump() {
    if (starting) {
        jumping = 1;
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
            if (characterTop > 6 && (counter < 15)) {
                character.style.top = (characterTop - 4) + "px";
            }
            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                jumping = 0;
                jumpCount = 0;
            }
            jumpCount++;
        }, 10);
    }
}

const startAnimation = () => {
        hole.classList.add('animate');
        block.classList.add('animate');
}
const stopAnimation = () => {
    hole.classList.remove('animate');
    block.classList.remove('animate');
}

startScreen.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) { // Spacebar keyCode
        console.log('Spacebar pressed');
    }
});