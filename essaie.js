const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
const soundButton = document.getElementById('soundButton');
const soundIcon = document.getElementById('soundIcon');
const backgroundMusic = document.getElementById('backgroundMusic');
const introPage = document.getElementById('introPage');
const enterButton = document.getElementById('enterButton');
const bapWindow = document.getElementById('bapWindow');
const joinButton = document.getElementById('joinButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables pour le son
let isSoundOn = true;

// Fonction pour démarrer la musique et afficher la page principale
const startMusic = () => {
    console.log('Démarrage de la musique et de l\'animation'); // Débogage
    introPage.style.display = 'none'; // Masquer la page d'intro
    canvas.style.display = 'block'; // Afficher le canvas pour l'animation
    bapWindow.style.display = 'block'; // Afficher la fenêtre BAP
    soundButton.style.display = 'flex'; // Afficher le bouton du son
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch(error => console.log("Erreur lors de la lecture de la musique :", error));
    animate(); // Démarrer l'animation
};

enterButton.addEventListener('click', () => {
    console.log('Le bouton Enter a été cliqué'); // Débogage
    startMusic();
});

joinButton.addEventListener('click', () => {
    window.location.href = "https://discord.gg/"; // Remplace avec le vrai lien
});

// Fonction pour basculer entre son activé et désactivé
const toggleSound = () => {
    if (isSoundOn) {
        backgroundMusic.pause();
        soundIcon.src = 'soundoff.png';
    } else {
        backgroundMusic.play();
        soundIcon.src = 'sound.png';
    }
    isSoundOn = !isSoundOn;
};

soundButton.addEventListener('click', toggleSound);

// Animation des nodes sur le canvas
const nodes = [];
const numNodes = 150;

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = 3 + Math.random() * 3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'lime';
        ctx.fill();
        ctx.closePath();
    }
}

for (let i = 0; i < numNodes; i++) {
    nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
}

function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dist = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = 'lime';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let node of nodes) {
        node.update();
        node.draw();
    }
    drawConnections();
    requestAnimationFrame(animate);
}
