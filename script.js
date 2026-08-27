const links = document.querySelectorAll('.linker a');

// --- Música de fondo ---
const musica = document.getElementById('musicaFondo');

let volumenNormal = 0.6;   // volumen normal de la música
let volumenBajo = 0.4;    // volumen cuando suena un click
let yaSonando = false;

musica.volume = volumenNormal;

function iniciarMusica() {
    if (!yaSonando) {
        musica.play().catch(() => {
            // si el navegador bloquea el intento, no pasa nada,
            // se reintentará con la siguiente interacción
        });
        yaSonando = true;
    }
}

// Arranca la música en la PRIMERA interacción del usuario, sea donde sea
document.body.addEventListener('click', iniciarMusica, { once: true });


// --- Sonido de los links + bajar volumen de la música mientras suena ---
links.forEach(link => {
    link.addEventListener('click', () => {
        const rutaSonido = link.getAttribute('data-sound');
        const audio = new Audio(rutaSonido);
        audio.play();

        // Efecto "ducking": baja el volumen de la música mientras suena el click
        musica.volume = volumenBajo;

        audio.addEventListener('ended', () => {
            musica.volume = volumenNormal;
        });
    });
});
    
