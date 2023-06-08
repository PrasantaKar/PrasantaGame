// Setup Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 700;

// Global Variables
let player = {
  x: 0,
  y: 300,
  w: 50,
  h: 50,
  speed: 5,
  tagged: false, // Indicates if the player is tagged or not
};

let player2 = {
  x: 950,
  y: 300,
  w: 50,
  h: 50,
  speed: 5,
  tagged: false, // Indicates if the player is tagged or not
};

let wall1 = {
  x: 300,
  y: 100,
  w: 200,
  h: 400,
};

let wall2 = {
  x: 600,
  y: 200,
  w: 300,
  h: 300,
};

let wall3 = {
  x: 100,
  y: 500,
  w: 400,
  h: 100,
};

let arrowRightPressed = false;
let arrowLeftPressed = false;
let arrowUpPressed = false;
let arrowDownPressed = false;

let keyRightPressed = false;
let keyLeftPressed = false;
let keyUpPressed = false;
let keyDownPressed = false;

let timer = 30; // Timer in seconds
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let tagger = Math.random() < 0.5 || player || player2; // Randomly choose the initial tagger

// Main Program Loop
requestAnimationFrame(draw);

function draw() {
  // Logic

  // Move player based on key is pressed / held down
  if (arrowRightPressed && player2.x + player2.w < cnv.width) {
    player2.x += player2.speed;
  } else if (arrowLeftPressed && player2.x > 0) {
    player2.x -= player2.speed;
  }

  if (arrowUpPressed && player2.y > 0) {
    player2.y -= player2.speed;
  } else if (arrowDownPressed && player2.y + player2.h < cnv.height) {
    player2.y += player2.speed;
  }

  if (keyRightPressed && player.x + player.w < cnv.width) {
    player.x += player.speed;
  } else if (keyLeftPressed && player.x > 0) {
    player.x -= player.speed;
  }

  if (keyUpPressed && player.y > 0) {
    player.y -= player.speed;
  } else if (keyDownPressed && player.y + player.h < cnv.height) {
    player.y += player.speed;
  }

  // Check for collision with walls
  if (checkWallCollision(player, wall1)) {
    // Collision occurred, move the player back
    player.x = wall1.x - player.w;
  }
  if (checkWallCollision(player, wall2)) {
    player.x = wall2.x + wall2.w;
  }
  if (checkWallCollision(player, wall3)) {
    player.y = wall3.y - player.h;
  }

  if (checkWallCollision(player2, wall1)) {
    player2.x = wall1.x - player2.w;
  }
  if (checkWallCollision(player2, wall2)) {
    player2.x = wall2.x + wall2.w;
  }
  if (checkWallCollision(player2, wall3)) {
    player2.y = wall3.y - player2.h;
  }

  // Check for collision
  if (checkCollision(player, player2)) {
    if (!player.tagged && !player2.tagged) {
      if (tagger === player) {
        player.tagged = true;
        player.speed = 0;
        setTimeout(() => {
          player.tagged = false;
          player.speed = 5;
        }, 3000); // After 3 seconds
        tagger = player2;
        scorePlayer2++;
      } else {
        player2.tagged = true;
        player2.speed = 0;
        setTimeout(() => {
          player2.tagged = false;
          player2.speed = 5;
        }, 3000); // After 3 seconds
        tagger = player;
        scorePlayer1++;
      }
      timer = 30; // Reset the timer
    }
  }

  // Decrease the timer
  if (timer > 0) {
    timer -= 1 / 60;
  } else {
    if (tagger === player) {
      scorePlayer1++;
    } else {
      scorePlayer2++;
    }
    timer = 30; // Reset  timer
  }

  if (scorePlayer1 === 11) {
    document.getElementById("output").innerHTML = "BLUE WINS";
    document.getElementById("output").style.backgroundColor = "Blue";
  }

  if (scorePlayer2 === 11) {
    document.getElementById("output").innerHTML = "GREEN WINS";
    document.getElementById("output").style.backgroundColor = "Green";
  }

  // Drawing
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Draw Players

  if (player.tagged) {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 50;
  } else {
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
  }
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.strokeRect(player.x, player.y, player.w, player.h);

  if (player2.tagged) {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 50;
  } else {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;
  }
  ctx.fillRect(player2.x, player2.y, player2.w, player2.h);
  ctx.strokeRect(player2.x, player2.y, player2.w, player2.h);

  // Draw Timer
  ctx.fillStyle = "White";
  ctx.font = "22px Arial";
  ctx.fillText("Timer: " + Math.ceil(timer), 10, 20);

  // Draw Scores
  ctx.fillStyle = "White";
  ctx.font = "25px Arial";
  ctx.fillText("Player blue Score: " + scorePlayer1, 10, 50);
  ctx.fillText("Player green Score: " + scorePlayer2, 10, 80);

  // Draw walls
  ctx.fillStyle = "gray";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);

  // Request next frame
  requestAnimationFrame(draw);
}

function checkWallCollision(player, wall) {
  // Check if the player intersects with the wall
  if (
    player.x + player.w > wall.x &&
    player.x < wall.x + wall.w &&
    player.y + player.h > wall.y &&
    player.y < wall.y + wall.h
  ) {
    return true;
  }
  return false;
}

// Player Collision
function checkCollision(player, player2) {
  if (
    player.x < player2.x + player2.w &&
    player.x + player.w > player2.x &&
    player.y < player2.y + player2.h &&
    player.y + player.h > player2.y
  ) {
    return true;
  }
  return false;
}

// Event Listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Reset Function
document.getElementById("reset").addEventListener("click", iconundobtnClicked);

function iconundobtnClicked() {
  location.reload();
}

function keyDownHandler(event) {
  // Player 1 controls (Arrow keys)
  if (event.key === "ArrowRight") {
    arrowRightPressed = true;
  } else if (event.key === "ArrowLeft") {
    arrowLeftPressed = true;
  } else if (event.key === "ArrowUp") {
    arrowUpPressed = true;
  } else if (event.key === "ArrowDown") {
    arrowDownPressed = true;
  }

  // Player 2 controls (WASD keys)
  if (event.key === "d") {
    keyRightPressed = true;
  } else if (event.key === "a") {
    keyLeftPressed = true;
  } else if (event.key === "w") {
    keyUpPressed = true;
  } else if (event.key === "s") {
    keyDownPressed = true;
  }
}

function keyUpHandler(event) {
  // Player 1 controls (Arrow keys)
  if (event.key === "ArrowRight") {
    arrowRightPressed = false;
  } else if (event.key === "ArrowLeft") {
    arrowLeftPressed = false;
  } else if (event.key === "ArrowUp") {
    arrowUpPressed = false;
  } else if (event.key === "ArrowDown") {
    arrowDownPressed = false;
  }

  // Player 2 controls (WASD keys)
  if (event.key === "d") {
    keyRightPressed = false;
  } else if (event.key === "a") {
    keyLeftPressed = false;
  } else if (event.key === "w") {
    keyUpPressed = false;
  } else if (event.key === "s") {
    keyDownPressed = false;
  }
}
