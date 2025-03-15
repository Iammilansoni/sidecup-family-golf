gsap.registerPlugin(ScrollTrigger);

// Cursor Animation
const cursor = document.getElementById("cursor");
const blur = document.getElementById("cursor-blur");

document.addEventListener("mousemove", (event) => {
    let { x, y } = event;

    // Move cursor instantly
    cursor.style.transform = `translate(${x}px, ${y}px)`;

    // Smooth blur movement
    gsap.to(blur, {
        x: x - 250,
        y: y - 250,
        duration: 0.2,
        ease: "power2.out",
    });
});

// Navbar Background Change on Scroll
gsap.to("#nav", {
    backgroundColor: "#000",
    duration: 0.5,
    height: "80px",
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top -11%",
        scrub: 1,
    },
});

// Main Background Change
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

// Cards Animation
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

// 3D Effect on Hover
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        let rect = card.getBoundingClientRect();
        let xAxis = (e.clientX - rect.left - rect.width / 2) / 15;
        let yAxis = -(e.clientY - rect.top - rect.height / 2) / 15;

        gsap.to(card, {
            rotateY: xAxis,
            rotateX: yAxis,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center center",
        });
    });

    card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3 });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, rotateY: 0, rotateX: 0, duration: 0.3 });
    });
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Disable Cursor Effects on Mobile
if (window.matchMedia("(pointer: coarse)").matches) {
    cursor.style.display = 'none';
    blur.style.display = 'none';
}
