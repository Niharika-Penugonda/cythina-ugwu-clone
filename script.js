let timeout;
const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

function firstPageAnime() {
  let tl = gsap.timeline();

  tl.from(".nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundEl", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from(".herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleSkewer() {
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout);
    let xdiff = dets.clientX - xprev;
    let ydiff = dets.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(() => {
      document.querySelector(
        ".miniCircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", (dets) => {
    let circle = document.querySelector(".miniCircle");
    circle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleSkewer();
circleMouseFollower();
firstPageAnime();

document.querySelectorAll(".elem").forEach((elem) => {
  let rotate = 0;
  let rdiff = 0;
  const allImgs = document.querySelectorAll(".elem img");
  elem.addEventListener("mousemove", (dets) => {
    const img = elem.querySelector("img");
    const rect = elem.getBoundingClientRect();
    let diff = dets.clientY - rect.top;
    rdiff = dets.clientX - rotate;
    rotate = dets.clientX;

    // Hide other images so only the active one is visible (prevents overlap)
    allImgs.forEach((i) => {
      if (i !== img) gsap.to(i, { opacity: 0, duration: 0.15 });
    });

    // Position image relative to its element (prevent using global clientX)
    const leftRelative = dets.clientX - rect.left;

    gsap.to(img, {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: leftRelative,
      rotate: gsap.utils.clamp(-20, 20, rdiff),
      duration: 0.3,
    });
  });
  elem.addEventListener("mouseleave", () => {
    const img = elem.querySelector("img");
    gsap.to(img, {
      opacity: 0,
      rotate: 0,
      ease: Power3,
      duration: 0.3,
    });
  });
});
