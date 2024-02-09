let greenSnake = document.getElementsByClassName('snake');
let snake = [{ dir: 'up', top: 0, left: 0 }];
let isMoving = false;
let direction = { face: 'up', dx: 0, dy: 0 };
let animationFrameId;
const food = document.querySelector('.food');
let foodpos = { top: 0, left: 0 };
const speed = 20; 
let playgame = true;
let isPaused = false;
const score = document.getElementById('score')
const highscore =document.getElementById('highscore')
let count=0;
let highcount=0;
const finalscreen=document.getElementById('finalScreen')
const restart= document.getElementById('restart')
const msg=document.getElementById('msg');
const game=document.getElementById('game')
let x=0;

generateFood();

document.addEventListener('keydown', e => {
  if (!isMoving) {
    identifyDirection(e.key);
    isMoving = true;
      startMoving();
  } else {
    direction = identifyDirection(e.key);
  }
});

function startMoving() {
  function animateSnake() {
    if (playgame && !isPaused) {
      for (let i = snake.length - 1; i > 0; i--) {
        snake[i].dir = snake[i - 1].dir;
        snake[i].top = snake[i - 1].top;
        snake[i].left = snake[i - 1].left;
      }

      snake[0].top = snake[0].top + direction.dy;
      snake[0].left = snake[0].left + direction.dx;
      snake[0].dir = direction.face;

      if (snake[0].top < 0) snake[0].top = 680;
      if (snake[0].left < 0) snake[0].left = 780;
      if (snake[0].top > 680) snake[0].top = 0;
      if (snake[0].left > 780) snake[0].left = 0;

      for (let i = 0; i < snake.length; i++) {
        greenSnake[i].style.top = snake[i].top + 'px';
        greenSnake[i].style.left = snake[i].left + 'px';
      }
      checkeat();
      checkend();
      setTimeout(function () {
        animationFrameId = requestAnimationFrame(animateSnake);
      }, 75);
    }
  }
  animateSnake();
}

function identifyDirection(key) {
  switch (key) {
    case 'ArrowUp':
      return {face:'up', dx: 0, dy: -speed };
    case 'ArrowDown':
      return {face:'down', dx: 0, dy: speed };
    case 'ArrowRight':
      return {face:'right', dx: speed, dy: 0 };
    case 'ArrowLeft':
      return {face:'left', dx: -speed, dy: 0 };
    default:
      return direction; 
  }
}
function generateFood() {
  let num1 = Math.floor(Math.random() * 681);
  const rem1 = num1 % speed;
  num1 = num1 - rem1;
  let num2 = Math.floor(Math.random() * 781);
  const rem2 = num2 % speed;
  num2 = num2 - rem2;
  foodpos.top = num1;
  foodpos.left = num2;
  food.style.top = num1 + 'px';
  food.style.left = num2 + 'px';
}

function checkeat() {
  if (snake[0].top === foodpos.top && snake[0].left === foodpos.left) {
    generateFood();
    count++;;
    updateScore();
    drawSnake();
  }
}

function drawSnake() {
  const n = snake.length;
  let newSegment = {}; 
  if (snake[n - 1].dir === 'up') {
    newSegment = {
      dir: 'up',
      top: snake[n - 1].top - 20,
      left: snake[n - 1].left
    };
  } else if (snake[n - 1].dir === 'down') {
    newSegment = {
      dir: 'down',
      top: snake[n - 1].top + 20,
      left: snake[n - 1].left
    };
  } else if (snake[n - 1].dir === 'right') {
    newSegment = {
      dir: 'right',
      top: snake[n - 1].top,
      left: snake[n - 1].left + 20
    };
  } else if (snake[n - 1].dir === 'left') {
    newSegment = {
      dir: 'left',
      top: snake[n - 1].top,
      left: snake[n - 1].left - 20
    };
  }
  snake.push(newSegment); 
  const snakeElement = document.createElement('div');
  snakeElement.style.top = newSegment.top + 'px';
  snakeElement.style.left = newSegment.left + 'px';
  snakeElement.style.backgroundColor ='rgb(59, 132, 0)'
  snakeElement.classList.add('snake');
  document.querySelector('#game').appendChild(snakeElement);
  greenSnake[n].style.display='block'
}

function checkcoll(l){
  if(snake[0].dir == snake[l].dir){
    return false
  }
  else
   return true
}

function checkend() {
  for (let i = 1; i < snake.length; i++) {
    if ((snake[0].top == snake[i].top && snake[0].left == snake[i].left) && (checkcoll(i))) {
      playgame = false;
      isPaused = true; 
      changeHighscore();
      console.log('Game over!');
      endscreen();
    }
  }
}

function togglePause() {
  isPaused = !isPaused;
}

function updateScore(){
   score.textContent=`Score : ${count}`
}

function changeHighscore(){
    if(count > highcount){
       highcount=count;
    }
    highscore.textContent=`Highscore : ${highcount}`
}

function endscreen(){
   finalscreen.style.display='flex'
   msg.textContent=`YOUR SCORE : ${count}`
}

restart.addEventListener('click',reset)

function reset() {
  greenSnake[0].style.top = '0px';
  greenSnake[0].style.left = '0px';

    const listItemsToRemove = game.querySelectorAll('div:nth-child(n+3)');
    listItemsToRemove.forEach(div => {
    game.removeChild(div);
});
  snake = [{ dir: 'up', top: 0, left: 0 }];
  isMoving = false;
  direction = { face: 'up', dx: 0, dy: 0 };
  playgame = true;
  isPaused = false;
  x=count;
  count = 0;

  generateFood();
  updateScore();

  finalscreen.style.display = 'none';
}