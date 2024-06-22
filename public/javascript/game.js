const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time b"),
    flipsTag = document.querySelector(".flips b"),
    finalScoreTag = document.querySelector(".final-score"),
    refreshBtn = document.querySelector(".details button");

let maxTime = 30;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        showFinalScore();
        return;
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = matchedCard;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        flipsTag.innerText = matchedCard;
        if (matchedCard % 6 == 0 && timeLeft > 0) {
            startNewRound();
            return;
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
        return;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function startNewRound() {
    clearInterval(timer);
    maxTime = Math.max(maxTime - 5, 5);
    timeLeft = maxTime;
    timeTag.innerText = timeLeft;
    isPlaying = false;
    shuffleCard();
}

function shuffleCard() {
    flips = matchedCard;
    cardOne = cardTwo = "";
    disableDeck = false;

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `/assets/img_${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

function showFinalScore() {
    finalScoreTag.innerText = `You flipped ${matchedCard} fruits!`;
    finalScoreTag.style.display = "block";
    disableDeck = true;
}

shuffleCard();

refreshBtn.addEventListener("click", () => {
    finalScoreTag.style.display = "none";
    maxTime = 30;
    timeLeft = maxTime;
    matchedCard = 0;
    flips = 0;
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    clearInterval(timer);
    isPlaying = false;
    shuffleCard();
});

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
