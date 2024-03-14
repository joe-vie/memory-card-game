const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
//used to compare the 2 cards
let lockBoard = false;
//the score eventually changes but its default is left at zero
let score = 0;

document.querySelector(".score").textContent = score;

//this is where the images are located
fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

//shuffling and shuffling
function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

//card generation
function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    //keeping backticks here cuz of all the symbols
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

//this allows for the card to be flipped
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  cardMatches = firstCard+secondCard;

  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

//this checks for a match within the deck
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  //we'll highlight the importance of isMatch here
  isMatch ? disableCards() : unflipCards();
  
    return;
  
    endOfGame();
} 
//this disables the cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

//this unflips my cards
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

/* // this is the confetti part at the end teehee
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 450;
const gravity = 0.69;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
{ front: '#9BCF53', back: '#9BCF53' },
{ front: '#A5DD9B', back: '#A5DD9B' },
{ front: '#59B4C3', back: '#59B4C3' },
{ front: '#FCDC2A', back: '#FCDC2A' },
{ front: '#D5F0C1', back: '#D5F0C1' },
{ front: '#0D9276', back: '#0D9276' },
{ front: '#8CC0DE', back: '#8CC0DE' },
{ front: '#FFF67E', back: '#FFF67E' }];

//resizing of the canvas
resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

//big boom boom
initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 2,
        y: 2 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });
  }
};

//rendering of the confetti
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    //moving the canvas' position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    //applying forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    //setting the confetti's position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    //deletes confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    //loop confetto & position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    //weee spin confetti by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    //draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    //resets transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  //allows to fire off another round of confetti
  if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
};

initConfetti();
render();

window.addEventListener('resize', function () {
  resizeCanvas();
});

window.addEventListener('click', function () {
  initConfetti();
}); */
// this is the popup we will make for this game
//function endOfGame() {
  ///let cardMatches = (firstCard + secondCard) * 8;
    //if (cardMatches) {
      //alert("Congratulations! You won! Take a screenshot to show off to friends or refresh with the refresh button below.");
    //}
  //return;
//}
//allows for the deck to reset
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
/* Credits to Asif Mughal for confetti inspiration:
https://www.codehim.com/animation-effects/javascript-confetti-explosion-effect/

Credits to Adam Nagy for Memory Card game inspiration:
https://www.codehim.com/animation-effects/javascript-confetti-explosion-effect/
*/

//boop beep beep boop