gsap.registerPlugin(ScrollTrigger);

// Cursor Animation
var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
    blur.style.left = dets.x - 250 + "px";
    blur.style.top = dets.y - 250 + "px";
});

var h4all = document.querySelectorAll("#nav h4");
h4all.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        crsr.style.scale = 3;
        crsr.style.border = "1px solid #fff";
        crsr.style.backgroundColor = "transparent";
    });
    elem.addEventListener("mouseleave", function () {
        crsr.style.scale = 1;
        crsr.style.border = "0px solid #95C11E";
        crsr.style.backgroundColor = "#95C11E";
    });
});

// GSAP Animations
gsap.to("#nav", {
    backgroundColor: "#000",
    duration: 0.5,
    height: "110px",
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top -11%",
        scrub: 1,
    },
});

gsap.to("#main", {
    backgroundColor: "#000",
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top -25%",
        end: "top -70%",
        scrub: 2,
    },
});

gsap.from(".card", {
    scale: 0.8,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
        trigger: ".card",
        scroller: "body",
        start: "top 70%",
        end: "top 65%",
        scrub: 1,
    },
});

document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.card').forEach(card => {
      let rect = card.getBoundingClientRect();
      let xAxis = (e.clientX - rect.left - rect.width / 2) / 15;
      let yAxis = -(e.clientY - rect.top - rect.height / 2) / 15;
      
      gsap.to(card, {
          rotateY: xAxis,
          rotateX: yAxis,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000, // Add perspective for 3D effect
          transformOrigin: "center center" // Ensure the rotation is around the center
      });
  });
});

// Add hover effect
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
      gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
      });
  });

  card.addEventListener('mouseleave', () => {
      gsap.to(card, {
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 0.3,
          ease: "power2.out"
      });
  });
});

// Throttle the mousemove event for better performance
function throttle(callback, limit) {
  let waiting = false;
  return function() {
      if (!waiting) {
          callback.apply(this, arguments);
          waiting = true;
          setTimeout(() => {
              waiting = false;
          }, limit);
      }
  }
}

document.addEventListener('mousemove', throttle((e) => {
  document.querySelectorAll('.card').forEach(card => {
      let rect = card.getBoundingClientRect();
      let xAxis = (e.clientX - rect.left - rect.width / 2) / 15;
      let yAxis = -(e.clientY - rect.top - rect.height / 2) / 15;
      
      gsap.to(card, {
          rotateY: xAxis,
          rotateX: yAxis,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
          transformOrigin: "center center"
      });
  });
}, 100)); // Throttle to 100ms


// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle Menu
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close Menu When Clicking Outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Close Menu on Menu Item Click
document.querySelectorAll('#mobile-menu h4').forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Disable Cursor Effects on Mobile
if (window.matchMedia("(pointer: coarse)").matches) {
    document.getElementById('cursor').style.display = 'none';
    document.getElementById('cursor-blur').style.display = 'none';
}
