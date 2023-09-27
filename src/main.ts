import './style.css'

const animationContainer = document.querySelector('.animation-container') as HTMLDivElement;
const animatedBlocks = animationContainer.children;

document.addEventListener('DOMContentLoaded', function () {
  loadAnimation();
  lineBackground();
});

window.addEventListener('resize', function () {
  requestAnimationFrame(lineBackground);
});

async function loadAnimation() {
  const animations: Promise<Animation>[] = [];
  const animationTiming = [600, 800, 1200, 800, 600]

  for (let i = 0; i < animatedBlocks.length; i++) {
    const block = animatedBlocks[i] as HTMLDivElement;

    const animation = block.animate(
      [
        { transform: 'scale(1.01, 1)' },
        { transform: 'scale(1.01, 0)' },
      ],
      {
        duration: animationTiming[i],
        delay: 400,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )

    animations.push(animation.finished);
  }

  await Promise.all(animations);

  animationContainer.remove();
}

function lineBackground() {
  const spacing = window.innerWidth > 768 ? 335: 200;
  const element = document.querySelector('.background') as HTMLDivElement;

  element.innerHTML = '';

  const lines = Math.ceil(window.innerWidth / spacing);
  const lineElements = [];

  for (let i = 0; i < lines; i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    lineElements.push(line);
  }

  element.append(...lineElements);
}
