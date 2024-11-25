//const  ctx = document.getElementById('pintura')
//const  ctx = document.querySelector('pintura').getContext('2d');
const ctx = pintura.getContext('2d');

// Lista de objetos con su imagen asignada
let objetos = [
    {nombre: 'juanito perez', x: 50, y: 0, width: 40, velocidad: 0.7, imagen: new Image()},
    {nombre: 'piedra2', x: 80, y: 0, width: 70, velocidad: 0.9, imagen: new Image()},
    {nombre: 'piedra3', x: 20, y: 60, width: 50, velocidad: 1, imagen: new Image()},
    {nombre: 'piedra4', x: 350, y: 0, width: 30, velocidad: 2, imagen: new Image()},
];

// Ruta de la imagen del asteroide
const imagenRuta = './img/asteroides.png';

// Cargar la imagen para todos los objetos
objetos.forEach(objeto => {
    objeto.imagen.src = imagenRuta;
    // Asignamos la imagen a la propiedad 'src' de cada objeto
});

const minRad = 20;
const rangeRad = 20;
let p = 0;  
let x = 700, y = 700;
let mouseRadioCrece = true;
let finJuego = false;
let n = 0;
let ard = 3;
let puntaje = 0;  // Inicializamos el puntaje en 0
const puntajeElemento = document.getElementById("puntaje");
const game = document.getElementById("GAMEOVER");
const vida = document.getElementById("vidas")

// Función de colisión
const colision = (objecto1, objecto2) => {
    const distancia = Math.sqrt((objecto2.x - objecto1.x) ** 2 + (objecto2.y - objecto1.y) ** 2);
    return distancia <= (objecto1.width / 2 + objecto2.width / 2);
};

// Función de animación
function animate() {
    const rad = minRad + rangeRad * p;

    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, pintura.width, pintura.height);

    objetos.forEach(objeto => {
        // Guardar el estado actual del canvas
        ctx.save();

        // Dibujar la imagen del objeto en forma circular
        ctx.beginPath();
        ctx.arc(objeto.x, objeto.y, objeto.width / 2, 0, Math.PI * 2);
        ctx.clip();  // Recorta la parte de la imagen dentro del círculo

        // Dibujar la imagen recortada dentro del círculo
        ctx.drawImage(objeto.imagen, objeto.x - objeto.width / 2, objeto.y - objeto.width / 2, objeto.width, objeto.width);

        // Restaurar el estado del canvas después de la operación de recorte
        ctx.restore();

        // Comprobar colisión con el mouse
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

        // Mover el objeto
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

    // Dibujar el círculo del mouse
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fillStyle = '#1288AA';
    ctx.fill();
    ctx.stroke();

    // Dibujar el borde del canvas
    ctx.beginPath();
    ctx.rect(1, 1, pintura.width - 1, pintura.height - 1);
    ctx.stroke();

    // Continuar la animación si no se ha terminado el juego
    if (!finJuego) {
        requestAnimationFrame(animate);
    }
}

setInterval(animate, 100000);
// Iniciar la animación
animate();

// Detectar movimiento del mouse
pintura.addEventListener('mousemove', (info) => {
    x = info.x - 550;
    y = info.y - 120;
});




