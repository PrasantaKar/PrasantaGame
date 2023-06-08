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

  // Request another Animation Frame
  requestAnimationFrame(draw);
}

// Key Event Stuff
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
document.getElementById("btn").addEventListener("click", myFunction1);
document.getElementById("btn1").addEventListener("click", myFunction2);
document.getElementById("btn2").addEventListener("click", myFunction3);
document.getElementById("btn3").addEventListener("click", myFunction4);
document.getElementById("btn4").addEventListener("click", myFunction5);
document.getElementById("btn5").addEventListener("click", myFunction6);

// Reset Function
document.getElementById("reset").addEventListener("click", iconundobtnClicked);

function iconundobtnClicked() {
  location.reload();
}
console.log("reset");

// Background Change Buttons
function myFunction1() {
  document.body.style.backgroundImage =
    "url('https://www.psdgraphics.com/wp-content/uploads/2020/08/top-view-grass-field-texture.jpg";
}

function myFunction2() {
  document.body.style.backgroundImage =
    "url('https://st2.depositphotos.com/2210070/6194/i/950/depositphotos_61946683-stock-photo-top-view-of-soccer-field.jpg";
}
function myFunction3() {
  document.body.style.backgroundImage =
    "url('https://media.istockphoto.com/id/1212609648/vector/basketball-court-with-wood-texture-basketball-tactical-court.jpg?s=612x612&w=0&k=20&c=G4TlQ76ffoUOxyF67NAnoiyzt9z0yEDs6V11sIjoodQ=";
}
function myFunction4() {
  document.body.style.backgroundImage =
    "url('https://images.pexels.com/photos/7294660/pexels-photo-7294660.jpeg?cs=srgb&dl=pexels-kindel-media-7294660.jpg&fm=jpg";
}

function myFunction5() {
  document.body.style.backgroundImage =
    "url('https://cdn.hswstatic.com/gif/outer-space.jpg";
}

function myFunction6() {
  document.body.style.backgroundImage =
    "url('https://m.media-amazon.com/images/I/61xyqFfGSNL.jpg";
}

function keydownHandler(event) {
  if (!event.repeat) {
    if (event.code == "ArrowRight") {
      arrowRightPressed = true;
    } else if (event.code == "ArrowLeft") {
      arrowLeftPressed = true;
    } else if (event.code == "ArrowUp") {
      arrowUpPressed = true;
    } else if (event.code == "ArrowDown") {
      arrowDownPressed = true;
    }
  }

  if (!event.repeat) {
    if (event.code == "KeyD") {
      keyRightPressed = true;
    } else if (event.code == "KeyA") {
      keyLeftPressed = true;
    } else if (event.code == "KeyW") {
      keyUpPressed = true;
    } else if (event.code == "KeyS") {
      keyDownPressed = true;
    } else if ((event.code = "Space")) {
    }
  }
}

function keyupHandler(event) {
  // keyIsPressed Movement
  if (event.code == "ArrowRight") {
    arrowRightPressed = false;
  } else if (event.code == "ArrowLeft") {
    arrowLeftPressed = false;
  } else if (event.code == "ArrowUp") {
    arrowUpPressed = false;
  } else if (event.code == "ArrowDown") {
    arrowDownPressed = false;
  }
  if (event.code == "KeyD") {
    keyRightPressed = false;
  } else if (event.code == "KeyA") {
    keyLeftPressed = false;
  } else if (event.code == "KeyW") {
    keyUpPressed = false;
  } else if (event.code == "KeyS") {
    keyDownPressed = false;
  }
}

// Return value to be returned to the function caller
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
