const musicBtn = document.getElementById('musicBtn');
const musicText = document.getElementById('musicText');
const song = document.getElementById('song');
const surpriseBtn = document.getElementById('surpriseBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const musicBtn = document.getElementById('musicBtn');
const musicText = document.getElementById('musicText');
const song = document.getElementById('song');

let musicStarted = false;

// Start music on the first touch/click anywhere
async function startMusic() {
  if (musicStarted) return;

  try {
    await song.play();
    musicStarted = true;
    musicText.textContent = 'Pause our song';
  } catch (error) {
    console.log('Music error:', error);
  }
}

document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });

// Music button
musicBtn.addEventListener('click', async (event) => {
  event.stopPropagation();

  if (song.paused) {
    try {
      await song.play();
      musicStarted = true;
      musicText.textContent = 'Pause our song';
    } catch (error) {
      musicText.textContent = 'Music error';
    }
  } else {
    song.pause();
    musicText.textContent = 'Play our song';
  }
});
// تشغيل الأغنية من أول ضغطة في أي مكان بالموقع
let firstClick = true;

document.addEventListener('click', async () => {
  if (firstClick) {
    firstClick = false;

    try {
      await song.play();
      musicText.textContent = 'Pause our song';
    } catch (e) {
      console.log('Music could not start:', e);
    }
  }
}, { once: true });

// زر تشغيل / إيقاف الأغنية
musicBtn.addEventListener('click', async (e) => {
  e.stopPropagation();

  if (song.paused) {
    try {
      await song.play();
      musicText.textContent = 'Pause our song';
    } catch(e) {
      musicText.textContent = 'Add song.mp3';
    }
  } else {
    song.pause();
    musicText.textContent = 'Play our song';
  }
});

surpriseBtn.addEventListener('click', () => {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  burst();
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
});

modal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal.click());

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add('visible');
  });
}, {threshold: .12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function makeHeart() {
  const h = document.createElement('span');
  h.textContent = Math.random() > .5 ? '♥' : '♡';
  h.style.left = Math.random()*100 + 'vw';
  h.style.animationDuration = (6 + Math.random()*5) + 's';
  h.style.fontSize = (10 + Math.random()*14) + 'px';
  document.querySelector('.floating-hearts').appendChild(h);
  setTimeout(() => h.remove(), 11000);
}

setInterval(makeHeart, 850);

function burst(){
  for(let i=0;i<30;i++){
    setTimeout(()=>{
      const h=document.createElement('span');
      h.textContent='♥';
      h.style.position='fixed';
      h.style.left=(50+(Math.random()-.5)*50)+'vw';
      h.style.top=(50+(Math.random()-.5)*35)+'vh';
      h.style.zIndex=100;
      h.style.color='rgba(217,154,158,.9)';
      h.style.fontSize=(12+Math.random()*22)+'px';
      h.style.pointerEvents='none';
      h.style.transition='transform 1.3s ease, opacity 1.3s ease';
      document.body.appendChild(h);
      requestAnimationFrame(()=>{
        h.style.transform=`translate(${(Math.random()-.5)*350}px, ${(Math.random()-.5)*350}px) rotate(${Math.random()*360}deg)`;
        h.style.opacity=0;
      });
      setTimeout(()=>h.remove(),1400);
    },i*30);
  }
}
