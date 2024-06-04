document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', startGame);

const hints = {
    easy: [
        { hint: 'Acest fruct este galben și curbat.', answer: 'banana' },
        { hint: 'Acest fruct este roșu și suculent.', answer: 'mar' }
    ],
    medium: [
        { hint: 'Acest fruct este mic și roșu, de obicei folosit în salate.', answer: 'rosie' },
        { hint: 'Această legumă este verde și are frunze.', answer: 'spanac' }
    ],
    hard: [
        { hint: 'Acest fruct este mic și violet, bogat în antioxidanți.', answer: 'afine' },
        { hint: 'Această legumă portocalie este bună pentru vedere.', answer: 'morcov' }
    ]
};

let score = 0;
let timer;
let currentHints;
let currentHintIndex = 0;

function startGame() {
    console.log('Game started');
    document.querySelector('.start-screen').classList.add('hidden');
    document.querySelector('.end-screen').classList.add('hidden');
    document.querySelector('.game-screen').classList.remove('hidden');

    score = 0;
    currentHintIndex = 0;
    document.getElementById('score').textContent = score;

    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    currentHints = hints[difficulty];

    loadNextHint();
    startTimer();
}

function loadNextHint() {
    if (currentHintIndex < currentHints.length) {
        const hint = currentHints[currentHintIndex];
        document.querySelector('.hint').textContent = hint.hint;
        loadImages();
    } else {
        endGame();
    }
}

function loadImages() {
    const imagesContainer = document.querySelector('.images');
    imagesContainer.innerHTML = '';

    const answers = ['banana', 'mar', 'rosie', 'spanac', 'afine', 'morcov'];
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const img = document.createElement('img');
        img.src = `../images/${answer}.png`;
        img.alt = answer;
        img.addEventListener('click', () => checkAnswer(answer, img));
        imagesContainer.appendChild(img);
    });
}

function checkAnswer(answer, imgElement) {
    if (answer === currentHints[currentHintIndex].answer) {
        score++;
        document.getElementById('score').textContent = score;
        imgElement.classList.add('correct');
        setTimeout(() => {
            imgElement.classList.remove('correct');
            currentHintIndex++;
            loadNextHint();
        }, 500);
    } else {
        imgElement.classList.add('wrong');
        setTimeout(() => {
            imgElement.classList.remove('wrong');
        }, 500);
    }
}

function startTimer() {
    let timeLeft = 60;
    document.getElementById('timer').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    document.querySelector('.game-screen').classList.add('hidden');
    document.querySelector('.end-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
}
