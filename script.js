/* ========================================
   RICKKY'S 25TH BIRTHDAY
   INTERACTIVE ANIMATIONS
======================================== */


/* ========================================
   1. BACKGROUND STARS
======================================== */

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");

    star.className = "star";

    const size = Math.random() * 3 + 1;

    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration = (2 + Math.random() * 4) + "s";

    starsContainer.appendChild(star);
}


/* ========================================
   2. PAGE NAVIGATION
======================================== */

let currentPage = 1;

function showPage(pageNumber) {
    const current = document.querySelector(".page.active");
    const next = document.getElementById("page" + pageNumber);

    if (!next || pageNumber === currentPage) {
        return;
    }

    if (current) {
        current.classList.remove("active");
    }

    currentPage = pageNumber;

    next.classList.remove("active");

    // Restart the page entrance animation.
    void next.offsetWidth;

    next.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Birthday confetti.
    if (pageNumber === 2) {
        createConfetti(35);
    }

    // Floating hearts on the letter page.
    if (pageNumber === 6) {
        startFloatingHearts();
    }
}


/* ========================================
   3. CONFETTI ANIMATION
======================================== */

function createConfetti(amount = 100) {
    const container = document.getElementById("confetti-container");

    const colors = [
        "#39ff88",
        "#42ffe0",
        "#c0ffda",
        "#ffffff",
        "#b6ff53",
        "#ff8fab"
    ];

    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("span");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            (Math.random() * 0.8) + "s";

        piece.style.width =
            (5 + Math.random() * 8) + "px";

        piece.style.height =
            (8 + Math.random() * 12) + "px";

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 6000);
    }
}


/* ========================================
   4. FLOATING HEARTS
======================================== */

let heartsInterval = null;

function createFloatingHeart() {
    const container = document.getElementById("hearts");

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    const symbols = ["♡", "♥", "✧", "✦"];

    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (12 + Math.random() * 24) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 5) + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12000);
}

function startFloatingHearts() {
    if (heartsInterval) {
        return;
    }

    // Create the first hearts immediately.
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 250);
    }

    heartsInterval = setInterval(() => {
        // Keep the effect subtle instead of covering the letter.
        if (currentPage === 6) {
            createFloatingHeart();
        }
    }, 650);
}


/* ========================================
   5. CAKE COUNTDOWN
======================================== */

const countdown = document.getElementById("countdown");

const countdownLabel =
    document.getElementById("countdownLabel");

const countdownButton =
    document.getElementById("countdownButton");

const blowButton =
    document.getElementById("blowButton");

const cakeScene =
    document.getElementById("cakeScene");

const wishMessage =
    document.getElementById("wishMessage");

const cakeContinueButton =
    document.getElementById("cakeContinueButton");

let countdownStarted = false;
let candlesBlown = false;


countdownButton.addEventListener("click", function () {
    if (countdownStarted) {
        return;
    }

    countdownStarted = true;

    countdownButton.disabled = true;
    countdownButton.textContent = "MAKE A WISH...";

    countdownLabel.textContent =
        "CLOSE YOUR EYES AND MAKE A WISH";

    let number = 3;

    countdown.textContent = number;

    const timer = setInterval(() => {
        number--;

        if (number > 0) {
            countdown.textContent = number;

            // Small burst during the countdown.
            createConfetti(8);

        } else {
            clearInterval(timer);

            countdown.textContent = "♡";

            countdownLabel.textContent =
                "NOW IT'S TIME TO BLOW!";

            countdownButton.classList.add("hidden");

            blowButton.classList.remove("hidden");

            // Draw attention to the candles.
            blowButton.classList.add("button-pulse");

            createConfetti(25);
        }
    }, 1000);
});


/* ========================================
   6. BLOW THE CANDLES
======================================== */

blowButton.addEventListener("click", function () {
    if (candlesBlown) {
        return;
    }

    candlesBlown = true;

    cakeScene.classList.add("candles-out");

    countdown.textContent = "25 ♡";

    countdownLabel.textContent =
        "YOUR NEXT CHAPTER STARTS NOW";

    wishMessage.textContent =
        "May every beautiful wish in your heart come true. ♡";

    blowButton.textContent = "WISH MADE! 💚";

    blowButton.disabled = true;

    blowButton.classList.remove("button-pulse");

    // Big birthday confetti!
    createConfetti(180);

    // More confetti after the first burst.
    setTimeout(() => {
        createConfetti(100);
    }, 700);

    cakeContinueButton.classList.remove("hidden");
});


/* ========================================
   7. OPEN THE HEARTFELT LETTER
======================================== */

const messageButton =
    document.getElementById("messageButton");

const heartMessageWrapper =
    document.getElementById("heartMessageWrapper");

const finalFooter =
    document.getElementById("finalFooter");

let messageOpened = false;

messageButton.addEventListener("click", function () {
    if (messageOpened) {
        return;
    }

    messageOpened = true;

    // Hide the message button after the first click.
    messageButton.classList.add("hidden");

    // Reveal the heart-themed letter.
    heartMessageWrapper.classList.remove("hidden");

    // Trigger the entrance animation.
    void heartMessageWrapper.offsetWidth;

    heartMessageWrapper.style.animation =
        "messageReveal 1.3s cubic-bezier(.2,.8,.2,1) both";

    // Celebrate the message reveal.
    createConfetti(100);

    // Show the ending after a short delay.
    setTimeout(() => {
        finalFooter.classList.remove("hidden");

        createConfetti(70);
    }, 2500);
});


/* ========================================
   8. RESTART THE EXPERIENCE
======================================== */

function restartWebsite() {
    // Stop the current floating hearts effect.
    if (heartsInterval) {
        clearInterval(heartsInterval);
        heartsInterval = null;
    }

    // Reset navigation.
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    currentPage = 1;

    document.getElementById("page1").classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Reset countdown.
    countdownStarted = false;
    candlesBlown = false;
    messageOpened = false;

    countdown.textContent = "♡";

    countdownLabel.textContent =
        "YOUR BIRTHDAY WISH STARTS HERE";

    countdownButton.disabled = false;

    countdownButton.textContent =
        "START THE COUNTDOWN";

    countdownButton.classList.remove("hidden");

    blowButton.classList.add("hidden");

    blowButton.disabled = false;

    blowButton.textContent = "🌬️ BLOW THE CANDLES";

    blowButton.classList.remove("button-pulse");

    cakeScene.classList.remove("candles-out");

    wishMessage.textContent = "";

    cakeContinueButton.classList.add("hidden");

    // Reset the letter page.
    messageButton.classList.remove("hidden");

    heartMessageWrapper.classList.add("hidden");
    heartMessageWrapper.style.animation = "";

    finalFooter.classList.add("hidden");

    // Remove existing floating hearts.
    document.getElementById("hearts").innerHTML = "";

    // Remove existing confetti.
    document.getElementById("confetti-container").innerHTML = "";
}


/* ========================================
   9. INITIAL WELCOME EFFECT
======================================== */

window.addEventListener("load", () => {
    // A small opening sparkle effect.
    setTimeout(() => {
        createConfetti(20);
    }, 600);

    console.log(
        "Happy 25th Birthday, Rickky! Made with love by your annoying person. 💚"
    );
});