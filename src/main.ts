import './style.css'

const animationContainer = document.querySelector('.animation-container') as HTMLDivElement;
const animatedBlocks = animationContainer.children;

document.addEventListener('DOMContentLoaded', loadAnimation);

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
