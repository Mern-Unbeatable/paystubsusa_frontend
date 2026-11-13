const COLORS = [
  "#FF3366",
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#EAB308",
];
const PARTICLE_COUNT = 70;

const randomShape = () => {
  const roll = Math.random();
  if (roll > 0.85) return "spiral";
  if (roll > 0.6) return "ribbon";
  return "rect";
};

const createParticle = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * -height - 20,
  w: Math.random() * 6 + 4,
  h: Math.random() * 10 + 6,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  speedY: Math.random() * 2.5 + 1.5,
  speedX: Math.random() * 2 - 1,
  rotation: Math.random() * Math.PI * 2,
  rotationSpeed: Math.random() * 0.1 - 0.05,
  wobble: Math.random() * 10,
  wobbleSpeed: Math.random() * 0.05,
  shape: randomShape(),
});

const drawSpiral = (ctx, size) => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let i = 0; i < 4 * Math.PI; i += 0.1) {
    ctx.lineTo(i * size * Math.cos(i), i * size * Math.sin(i));
  }
  ctx.stroke();
};

const drawRibbon = (ctx, w, h) => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(w, h / 2, -w, h, w, h * 2);
  ctx.lineWidth = 2;
  ctx.stroke();
};

const isOffscreen = (p, height) => p.y > height + 30;

const updateParticle = (p, width, height, recycle) => {
  p.y += p.speedY;
  p.x += p.speedX + Math.sin(p.wobble) * 0.5;
  p.wobble += p.wobbleSpeed;
  p.rotation += p.rotationSpeed;

  if (recycle && isOffscreen(p, height)) {
    p.y = -30;
    p.x = Math.random() * width;
  }
};

const drawParticle = (ctx, p) => {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.fillStyle = p.color;
  ctx.strokeStyle = p.color;

  if (p.shape === "rect") {
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
  } else if (p.shape === "spiral") {
    ctx.lineWidth = 1.5;
    drawSpiral(ctx, 0.8);
  } else {
    drawRibbon(ctx, p.w, p.h);
  }
  ctx.restore();
};

/**
 * Starts a looping confetti animation on the canvas.
 * `finish()` stops new confetti and ends once the rest has fallen; `stop()` ends immediately.
 */
export const startConfetti = (canvas) => {
  const ctx = canvas.getContext("2d");
  let frameId;
  let finishing = false;

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: PARTICLE_COUNT }, () =>
    createParticle(canvas.width, canvas.height),
  );

  const stop = () => {
    window.removeEventListener("resize", resize);
    cancelAnimationFrame(frameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      updateParticle(p, canvas.width, canvas.height, !finishing);
      drawParticle(ctx, p);
    });
    if (finishing && particles.every((p) => isOffscreen(p, canvas.height))) {
      stop();
      return;
    }
    frameId = requestAnimationFrame(render);
  };
  render();

  return {
    finish: () => {
      finishing = true;
      // Drop pieces that haven't entered the screen yet so the fade-out stays short.
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        if (particles[i].y < 0) particles.splice(i, 1);
      }
    },
    stop,
  };
};
