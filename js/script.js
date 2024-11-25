//const  ctx = document.getElementById('pintura')
//const  ctx = document.querySelector('pintura').getContext('2d');
const ctx = pintura.getContext('2d');
let objetos = [
    {nombre: 'juanito perez', x: 50, y: 0, width: 40, velocidad: 0.7, imagen: new Image()},
    {nombre: 'piedra2', x: 80, y: 0, width: 70, velocidad: 0.9, imagen: new Image()},
    {nombre: 'piedra3', x: 20, y: 60, width: 50, velocidad: 1, imagen: new Image()},
    {nombre: 'piedra4', x: 350, y: 0, width: 30, velocidad: 2, imagen: new Image()},
];
const imagenRuta = './img/asteroides.png';
objetos.forEach(objeto => {
    objeto.imagen.src = imagenRuta;
});

const minRad = 20;
const rangeRad = 20;
let p = 0;  
let x = 700, y = 700;
let mouseRadioCrece = true;
let finJuego = false;
let n = 0;
let ard = 3;
let puntaje = 0;
const puntajeElemento = document.getElementById("puntaje");
const game = document.getElementById("GAMEOVER");
const vida = document.getElementById("vidas")

const colision = (objecto1, objecto2) => {
    const distancia = Math.sqrt((objecto2.x - objecto1.x) ** 2 + (objecto2.y - objecto1.y) ** 2);
    return distancia <= (objecto1.width / 2 + objecto2.width / 2);
};
function animate() {
    const rad = minRad + rangeRad * p;
    ctx.clearRect(0, 0, pintura.width, pintura.height);

    objetos.forEach(objeto => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(objeto.x, objeto.y, objeto.width / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(objeto.imagen, objeto.x - objeto.width / 2, objeto.y - objeto.width / 2, objeto.width, objeto.width);
        ctx.restore();
        pintura.addEventListener('click', (info) => {
            if (colision({x: x, y: y, width: rad}, objeto)) {
                objeto.y = 0;
                if (objeto.y == 0) {
                    objeto.velocidad += 0.2;
                    objeto.x = Math.random() * pintura.width;
                    puntaje += 534;  // Incrementar el puntaje en 1
                    puntajeElemento.innerHTML = "Score:" + puntaje;
                }
            }
        });
        objeto.y += objeto.velocidad;
        if (objeto.y > pintura.height) {
            n = n + 1;
            if (n == 3) {
                game.innerHTML = "GAME OVER";
                vida.innerHTML = "vidas" + 0;
                finJuego = true;
            } else {
                objeto.y = 0;
                objeto.velocidad += 0.2;
                objeto.x = Math.random() * pintura.width;
                ard -= 1;
                vida.innerHTML = "vidas" + ard;
            }
        }
    });
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fillStyle = '#1288AA';
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(1, 1, pintura.width - 1, pintura.height - 1);
    ctx.stroke();
    if (!finJuego) {
        requestAnimationFrame(animate);
    }
}
setInterval(animate, 100000);
animate();
pintura.addEventListener('mousemove', (info) => {
    x = info.x - 550;
    y = info.y - 120;
});




