// Responsive nav bar item
$(document).ready(function () {
    $('.btn').click(function () {
        $('.items').toggleClass("show");
        $('ul li').toggleClass("hide");
    });
});


// Scroll to top button
const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.pageYOffset > 30) { // Show backToTopButton
        if (!backToTopButton.classList.contains("btnEntrance")) {
            backToTopButton.classList.remove("btnExit");
            backToTopButton.classList.add("btnEntrance");
            backToTopButton.style.display = "block";
        }
    }
    else { // Hide backToTopButton
        if (backToTopButton.classList.contains("btnEntrance")) {
            backToTopButton.classList.remove("btnEntrance");
            backToTopButton.classList.add("btnExit");
            setTimeout(function () {
                backToTopButton.style.display = "none";
            }, 250);
        }
    }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

// function backToTop() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToTop() {
    const targetPosition = 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 750;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};


// Parallex Depth Card
const wrapper = document.querySelectorAll(".cardWrap");

wrapper.forEach(element => {
  let state = {
    mouseX: 0,
    mouseY: 0,
    height: element.clientHeight,
    width: element.clientWidth
  };

  element.addEventListener("mousemove", ele => {
    const card = element.querySelector(".card1");
    const cardBg = card.querySelector(".cardBg");
    state.mouseX = ele.pageX - element.offsetLeft - state.width / 2;
    state.mouseY = ele.pageY - element.offsetTop - state.height / 2;

    // parallax angle in card
    const angleX = (state.mouseX / state.width) * 30;
    const angleY = (state.mouseY / state.height) * -30;
    card.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg) `;

    // parallax position of background in card
    const posX = (state.mouseX / state.width) * -40;
    const posY = (state.mouseY / state.height) * -40;
    cardBg.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
  });

  element.addEventListener("mouseout", () => {
    const card = element.querySelector(".card1,.card2");
    const cardBg = card.querySelector(".cardBg");
    card.style.transform = `rotateY(0deg) rotateX(0deg) `;
    cardBg.style.transform = `translateX(0px) translateY(0px)`;
  });
});