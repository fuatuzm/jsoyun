const TILE_SIZE = 32;
const canvas = document.getElementById("gameCanvas");
const ctx    = canvas.getContext("2d");

let gameState    = "menu";
let currentLevel = 1;
let bound2       = false; // slime2 için bağlanma durumu
let bound3       = false; // slime3 için bağlanma durumu
let offsetX2 = 0, offsetY2 = 0; // slime2 için offset
let offsetX3 = 0, offsetY3 = 0; // slime3 için offset
let slime3 = { x: 0, y: 0 };
let boundCount = 0;


const startImage = new Image();
startImage.src   = "giris_ekran.png";

// Ses dosyasını yükle
const clickSound = new Audio("click.mp3");

// Renkler
const COLOR_WALL   = "#157b95";
const COLOR_EMPTY  = "#0f1a20";
const COLOR_PLAYER = "#f88c8c";
const COLOR_GOAL   = "#ffffff";
const COLOR_SLIME2 = "#4dcce6";

let blink = true;
setInterval(() => blink = !blink, 400);

// Level verileri
const levels = {
  1: {
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
      [1,1,0,0,0,1,0,1,0,0,1,0,0,0,1],
      [1,0,1,0,0,1,0,0,1,0,1,0,1,0,1],
      [1,0,1,0,0,1,0,0,0,0,1,0,1,0,1],
      [1,0,0,1,0,1,1,0,0,0,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,1,0,1,3,1],
      [1,0,0,0,0,0,0,1,0,0,1,0,1,0,1],
      [1,1,1,1,1,1,0,0,1,0,0,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,1,0,1,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    spawn: { x:4, y:2 }
  },
  2: {
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
      [1,0,0,0,0,0,0,0,1,1,0,1,1,0,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1],
      [1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1],
      [1,0,0,0,0,1,0,3,1,0,0,0,0,0,1,0,0,1],
      [1,0,0,1,0,1,1,1,1,0,0,1,0,0,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    spawn:  { x:3, y:4 },
    spawn2: { x:5, y:3 }
  },
  3: {
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,1,1,0,0,1,0,1,1,0,1,0,1],
      [1,0,0,0,0,3,0,1,1,0,0,0,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,0,1,0,0,1,1,1,0,0,0,1,0,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,1,0,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,1,1,0,0,0,1,0,1],
      [1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1],
      [1,1,1,1,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1],
      [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1],
      [1,0,0,0,0,0,1,0,1,1,0,0,0,1,1,1,1,1,0,1],
      [1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
      [1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
      [1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    spawn:  { x:1, y:1 },
    spawn2: { x:18, y:14 }
  },
  4: {
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1],
      [1,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1],
      [1,0,1,0,1,1,1,0,1,1,0,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,1,3,1,0,1,0,0,1,0,1,0,1,0,1,0,1],
      [1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,0,1,1],
      [1,0,0,0,1,0,1,0,0,0,0,0,0,1,1,0,1,0,0,1],
      [1,0,1,1,1,0,1,1,1,1,1,1,1,1,0,0,1,0,0,1],
      [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,1],
      [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,0,0,1,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1],
      [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,0,2,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
      [1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    spawn:  { x:1, y:1 },
    spawn2: { x:17, y:9 },  // ilk mavi
    spawn3: { x:14, y:11 }  // ikinci mavi
  },
  5: {
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,0,1,1,0,0,1,0,1,0,0,0,0,0,1,0,1],
      [1,0,1,0,1,0,0,0,1,1,0,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,1,3,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
      [1,1,1,0,1,0,0,0,1,1,1,1,0,1,1,0,0,1,0,1],
      [1,0,0,0,1,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,0,1,0,0,1],
      [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,2,1,1],
      [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
      [1,0,0,0,0,1,0,0,0,0,0,0,0,0,2,1,1,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
      [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
      [1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    spawn:  { x:1, y:1 },
    spawn2: { x:17, y:9 },  // ilk mavi
    spawn3: { x:14, y:11 }  // ikinci mavi
  }
};

let player = { x:0, y:0 };
let slime2 = { x:0, y:0 };

// Duvar çarpışma kontrolü
function canMove(x,y){
  return levels[currentLevel].map[y][x] !== 1;
}

// Bitiş kontrol
function checkWin(){
  const onGoal = levels[currentLevel].map[player.y][player.x] === 3;

  if (currentLevel === 4) {
    // 4. seviyede: Oyuncu hedefte ve her iki mavi kare bağlıysa kazan
    return onGoal && bound2 && bound3;
  }

  if (!levels[currentLevel].spawn2) return onGoal;
  return onGoal && bound2;
}

// Level geçiş
function nextLevel(){
  currentLevel++;
  if(levels[currentLevel]){
    resetLevel();
  } else {
     gameState = "completed"; // Oyun bitti, completed durumuna geç
    currentLevel = 1;
  }
}

// Level sıfırla
function resetLevel(){
  const lvl = levels[currentLevel];
  const map = lvl.map;
  canvas.width  = map[0].length * TILE_SIZE;
  canvas.height = map.length * TILE_SIZE;

  player.x = lvl.spawn.x;
  player.y = lvl.spawn.y;
  bound2 = false;
  bound3 = false;
  offsetX2 = offsetY2 = offsetX3 = offsetY3 = 0;
  if(lvl.spawn2){
    slime2.x = lvl.spawn2.x;
    slime2.y = lvl.spawn2.y;
  }
  if (lvl.spawn3) {
    slime3.x = lvl.spawn3.x;
    slime3.y = lvl.spawn3.y;
  }
  boundCount = 0;
}


// Menü ekranı
function drawMenu(){
  // İlk levelin harita boyutuna göre canvas'ı ayarla
  const map = levels[1].map;
  canvas.width  = map[0].length * TILE_SIZE;
  canvas.height = map.length * TILE_SIZE;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
}

// Tebrik ekranı
function drawCompleted() {
  // Degrade arka plan
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#0f1a20");
  gradient.addColorStop(1, "#157b95");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  

  // Yanıp sönen yazı efekti
  ctx.fillStyle = `rgba(0, 0, 0, ${0.8 + Math.sin(Date.now() / 500) * 0.2})`;
  ctx.font = "bold 30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("OYUN TAMAMLANDI, TEBRİKLER!", canvas.width / 2, canvas.height / 2 - 20);

}


// Harita çizimi
function drawLevel(){
  const mapData = levels[currentLevel].map;
  for(let y=0; y<mapData.length; y++){
    for(let x=0; x<mapData[0].length; x++){
      ctx.fillStyle = mapData[y][x] === 1 ? COLOR_WALL : COLOR_EMPTY;
      ctx.fillRect(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);

      if(mapData[y][x] === 3 && blink){
        ctx.fillStyle = COLOR_GOAL;
        ctx.fillRect(x*TILE_SIZE+8, y*TILE_SIZE+8, TILE_SIZE-16, TILE_SIZE-16);
      }
    }
  }

  if(levels[currentLevel].spawn2){
    ctx.fillStyle = COLOR_SLIME2;
    ctx.fillRect(slime2.x*TILE_SIZE+8, slime2.y*TILE_SIZE+8, TILE_SIZE-16, TILE_SIZE-16);
  }
  if (levels[currentLevel].spawn3) {
    ctx.fillStyle = COLOR_SLIME2;
    ctx.fillRect(slime3.x*TILE_SIZE+8, slime3.y*TILE_SIZE+8, TILE_SIZE-16, TILE_SIZE-16);
  }

  ctx.fillStyle = COLOR_PLAYER;
  ctx.fillRect(player.x*TILE_SIZE+8, player.y*TILE_SIZE+8, TILE_SIZE-16, TILE_SIZE-16);
}

// Klavye


document.addEventListener("keydown", e => {
  if (gameState === "menu") {
    gameState = "playing";
    resetLevel();
    return;
  }

  if (gameState === "playing") {
    let dx = 0, dy = 0;
    if (e.key === "ArrowUp" || e.key === "w") dy--;
    if (e.key === "ArrowDown" || e.key === "s") dy++;
    if (e.key === "ArrowLeft" || e.key === "a") dx--;
    if (e.key === "ArrowRight" || e.key === "d") dx++;
    if (e.key === "r") { resetLevel(); return; }
    if (dx === 0 && dy === 0) return;

    const newPX = player.x + dx, newPY = player.y + dy;
    if (!canMove(newPX, newPY)) return;

    // Slime2 hareket kontrolü
    let newSX2 = newPX, newSY2 = newPY;
    if (bound2) {
      newSX2 = newPX + offsetX2;
      newSY2 = newPY + offsetY2;
      if (!canMove(newSX2, newSY2)) return;
    }

    // Slime3 hareket kontrolü
    let newSX3 = newPX, newSY3 = newPY;
    if (bound3) {
      newSX3 = newPX + offsetX3;
      newSY3 = newPY + offsetY3;
      if (!canMove(newSX3, newSY3)) return;
    }

    player.x = newPX;
    player.y = newPY;
    clickSound.play(); // Oyuncu hareket ettiğinde ses çal

    const lvl = levels[currentLevel];
    if (lvl.spawn2 && !bound2) {
      const slime2Near = Math.abs(player.x - slime2.x) + Math.abs(player.y - slime2.y) === 1;
      if (slime2Near) {
        boundCount++;
        offsetX2 = slime2.x - player.x;
        offsetY2 = slime2.y - player.y;
        bound2 = true;
        console.log("Slime2 bağlandı:", { offsetX2, offsetY2, slime2: { x: slime2.x, y: slime2.y }, player: { x: player.x, y: player.y } });
      }
    }

    if (lvl.spawn3 && !bound3) {
      const playerNear = Math.abs(player.x - slime3.x) + Math.abs(player.y - slime3.y) === 1;
      const slime2Near = Math.abs(slime2.x - slime3.x) + Math.abs(slime2.y - slime3.y) === 1;
      console.log("Slime3 bağlanma kontrolü:", { playerNear, slime2Near, bound2, player: { x: player.x, y: player.y }, slime2: { x: slime2.x, y: slime2.y }, slime3: { x: slime3.x, y: slime3.y } });
      if (playerNear || slime2Near) {
        boundCount++;
        if (playerNear) {
          offsetX3 = slime3.x - player.x;
          offsetY3 = slime3.y - player.y;
          console.log("Slime3 oyuncuya bağlandı:", { offsetX3, offsetY3 });
        } else if (slime2Near) {
          offsetX3 = slime3.x - slime2.x + offsetX2;
          offsetY3 = slime3.y - slime2.y + offsetY2;
          console.log("Slime3 slime2'ye bağlandı:", { offsetX3, offsetY3 });
        }
        bound3 = true;
      }
    }

    if (bound2) {
      slime2.x = player.x + offsetX2;
      slime2.y = player.y + offsetY2;
    }
    if (bound3) {
      slime3.x = player.x + offsetX3;
      slime3.y = player.y + offsetY3;
    }

    if (checkWin()) nextLevel();
  }
}
);


startImage.onload = ()=> drawMenu();

function gameLoop(){
  if(gameState==="menu"){
    drawMenu();
  }
   else if(gameState === "completed"){
    drawCompleted();
  }
  else {
    drawLevel();
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();