const slides = document.getElementById('slides');
let index = 0;

function showSlide(i) {
  const total = slides.children.length;
  if (i < 0) index = total - 1;
  else if (i >= total) index = 0;
  else index = i;

  slides.style.transform = `translateX(-${220 * index}px)`;
}


document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showSlide(index - 1);
  if (e.key === 'ArrowRight') showSlide(index + 1);
});

function atualizarContador() {
  const inicio = new Date('2023-08-19T00:00:00'); 
  const agora = new Date();

  let totalSegundos = Math.floor((agora - inicio) / 1000);

  const anos = Math.floor(totalSegundos / (365*24*60*60));
  totalSegundos -= anos * 365*24*60*60;

  const meses = Math.floor(totalSegundos / (30*24*60*60));
  totalSegundos -= meses * 30*24*60*60;

  const dias = Math.floor(totalSegundos / (24*60*60));
  totalSegundos -= dias * 24*60*60;

  const horas = Math.floor(totalSegundos / 3600);
  totalSegundos -= horas * 3600;

  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos - minutos*60;

  document.getElementById('anos').textContent = anos;
  document.getElementById('meses').textContent = meses;
  document.getElementById('dias').textContent = dias;
  document.getElementById('horas').textContent = horas;
  document.getElementById('minutos').textContent = minutos;
  document.getElementById('segundos').textContent = segundos;
}


setInterval(atualizarContador, 1000);
atualizarContador();

// ------------------------
// Confete
// ------------------------
const canvas = document.getElementById('confeteCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetes = [];

function criarConfete() {
  for (let i = 0; i < 100; i++) {
    confetes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 20,
      color: `hsl(${Math.random()*360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10
    });
  }
}

function drawConfete() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetes.forEach(c => {
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt, c.y);
    ctx.lineTo(c.x + c.tilt + c.r / 2, c.y + c.r);
    ctx.stroke();
  });
  updateConfete();
}

function updateConfete() {
  confetes.forEach(c => {
    c.y += 2;
    c.x += Math.sin(c.d);
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

// ------------------------
// Corações
// ------------------------
const coracoesContainer = document.getElementById('coracoesContainer');

function criarCoracao() {
  const coracao = document.createElement('div');
  coracao.classList.add('coracao');
  coracao.style.left = Math.random() * window.innerWidth + 'px';
  coracao.style.fontSize = (Math.random() * 20 + 20) + 'px';
  coracoesContainer.appendChild(coracao);
  
  // animação individual
  coracao.style.animationDuration = (4 + Math.random() * 2) + 's';

  // remove coração após animar
  setTimeout(() => {
    coracoesContainer.removeChild(coracao);
  }, 6000);
}

// ------------------------
// Iniciar animação
// ------------------------
function iniciarAnimacao() {
  criarConfete();
  setInterval(drawConfete, 20);

  // criar corações periodicamente
  setInterval(criarCoracao, 300);
}

// ajustar canvas ao redimensionar
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// iniciar ao carregar o site
window.addEventListener('load', iniciarAnimacao);



