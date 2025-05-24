## Javascript Oyun Promptları
 - javascript yardımı ile geliştireceğim puzzle oyunu için matrisler yardımıyla harita çizmek istiyorum bana bir örnek gösterir misin ?

```
    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 3, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 2, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ];

    function drawMap() {
      for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
          let tile = map[y][x];

          if (tile === 0) ctx.fillStyle = "#eee";      // boş
          else if (tile === 1) ctx.fillStyle = "#333"; // duvar
          else if (tile === 2) ctx.fillStyle = "red";  // oyuncu
          else if (tile === 3) ctx.fillStyle = "green";// çıkış

          ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }

    drawMap();
```

 -oyunumda kırmızı kareler ile mavi karelerin yapışmasında sorun yaşıyorum bu konuda yardımcı olur musun, hata ne olabilir ? 

1. Bağlantı (Yapışma) Kontrolü Eksik veya Yanlış
Eğer "kırmızı kare mavi kareye değdiğinde yapışsın" istiyorsan, şu mantığı kurman gerek:
```

if (!bound && checkCollision(red, blue)) {
  bound = true;
  offsetX = blue.x - red.x;
  offsetY = blue.y - red.y;
}
```
Buradaki checkCollision() fonksiyonu iki karenin çarpışıp çarpışmadığını anlamak için.

 2. Takip Etme Mantığı Eksik
Mavi karenin, kırmızı kareye yapıştıktan sonra onunla birlikte hareket etmesini istiyorsan şunu yapmalısın:
```

if (bound) {
  blue.x = red.x + offsetX;
  blue.y = red.y + offsetY;
}
```
Bu yoksa, mavi kare "bağlandı" ama yerinde kalıyor gibi görünür.


- oyunumun html dosyasına ses ekledim ama müzik çalmıyor script dosyama bir şey eklemem gerekli mi ?
```
document.addEventListener("click", function () {
  const music = document.getElementById("backgroundMusic");
  if (music.paused) {
    music.play();
  }
});
```

- oyunumda bölümde takıldığımda r tuşuna bastığımda restart atması gereken kodu yazdım ama çalışmıyor ?

1. keydown olayını yakaladığından emin ol
```
document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    restartLevel();
  }
});

```
2. restartLevel() fonksiyonu tanımlı mı?
Eğer çağırdığın restartLevel() fonksiyonu yoksa veya eksikse, hiçbir şey olmaz. Mesela şöyle olabilir:

```
function restartLevel() {
  // Oyuncunun pozisyonunu sıfırla
  player.x = startX;
  player.y = startY;

  // Skoru ve diğer değişkenleri sıfırla
  score = 0;
  items = [];
  dangerItems = [];

  // Yeni itemler oluştur
  for (let i = 0; i < 4; i++) items.push(spawnItem());
  dangerItems.push(spawnDangerItem());

  // Eğer zaman veya başka sayacın varsa onları da sıfırla
  timeLeft = 60;
  isGameOver = false;
}


```













