const questions = [
    {
        questionText: 'What does CSS Stand for?',
        answerOptions: [
            { answerText: 'Creative Style Sheets', isCorrect: false },
            { answerText: 'Colorful Style Sheets', isCorrect: false },
            { answerText: 'Computer Style Sheets', isCorrect: false },
            { answerText: 'Cascading Style Sheets', isCorrect: true }
        ]
    },
    {
        questionText: 'Where in an HTML docuement is the correct place to refer to an external style sheet?',
        answerOptions: [
            { answerText: 'At the end of the document', isCorrect: false },
            { answerText: 'In the head section', isCorrect: true },
            { answerText: 'In the body section', isCorrect: false }
        ]
    },
    {
        questionText: 'Which HTML attribute is used to define inline styles?',
        answerOptions: [
            { answerText: 'styles', isCorrect: false },
            { answerText: 'class', isCorrect: false },
            { answerText: 'style', isCorrect: true },
            { answerText: 'font', isCorrect: false }
        ]
    },
    {
        questionText: 'Which property is used to change the background color?',
        answerOptions: [
            { answerText: 'bgcolor', isCorrect: false },
            { answerText: 'color', isCorrect: false },
            { answerText: 'background-color', isCorrect: true }
        ]
    },
    {
        questionText: 'Which CSS property is used to change the text color of an element?',
        answerOptions: [
            { answerText: 'color', isCorrect: true },
            { answerText: 'fgcolor', isCorrect: false },
            { answerText: 'text-color', isCorrect: false }
        ]
    },
    {
        questionText: 'Which CSS property controls the text size?',
        answerOptions: [
            { answerText: 'text-style', isCorrect: false },
            { answerText: 'font-size', isCorrect: true },
            { answerText: 'text-size', isCorrect: false },
            { answerText: 'font-style', isCorrect: false },
        ]
    },
    {
        questionText: 'How do you make each word in a text start with a capital letter?',
        answerOptions: [
            { answerText: 'transform:capitalize', isCorrect: false },
            { answerText: "You can't do that with CSS", isCorrect: false },
            { answerText: 'text-style:capitalize', isCorrect: false },
            { answerText: 'text-transform:capitalize', isCorrect: true },
        ]
    },
    {
        questionText: 'Which property is used to change the font of an element?',
        answerOptions: [
            { answerText: 'font-weight', isCorrect: false },
            { answerText: 'font-family', isCorrect: true },
            { answerText: 'font-style', isCorrect: false },
        ]
    },
    {
        questionText: 'Which property is used to change the left margin of an element?',
        answerOptions: [
            { answerText: 'margin-left', isCorrect: true },
            { answerText: 'indent', isCorrect: false },
            { answerText: 'padding-left', isCorrect: false },
        ]
    },
    {
        questionText: 'What is the default value of the position property?',
        answerOptions: [
            { answerText: 'static', isCorrect: true },
            { answerText: 'fixed', isCorrect: false },
            { answerText: 'absolute', isCorrect: false },
            { answerText: 'relative', isCorrect: false },
        ]
    },
]

const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const scoreScreen = document.getElementById('score-screen');
const scoreText = document.getElementById('score-text');
const resetBtn = document.getElementById('reset-btn');

let currentQuestionIdx = 0;
let selectedButton;
let score = 0;

function startQuiz() {
    startScreen.classList.add('hidden');
    currentQuestionIdx = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    quizScreen.classList.remove('hidden');

    resetState();

    const questionMarkers = document.querySelectorAll('.question-marker');
    const questionPosition = document.querySelector('#question-position span')

    for (let i = 0; i < questionMarkers.length; i++) {
        if (i <= currentQuestionIdx) {
            questionMarkers[i].classList.add('progress');
        } else {
            questionMarkers[i].classList.add('#384150');
        }
    }

    questionPosition.textContent = currentQuestionIdx + 1;

    let currentQuestion = questions[currentQuestionIdx];
    questionEl.innerHTML = currentQuestion.questionText;

    currentQuestion.answerOptions.forEach(answer => {
        const button = document.createElement('button');

        button.innerHTML = answer.answerText;
        button.classList.add('answer-button');

        if (answer.isCorrect) {
            button.dataset.isCorrect = answer.isCorrect;
        }

        button.addEventListener('click', (e) => {
            if (selectedButton) {
                selectedButton.classList.remove('selected');
            }

            selectedButton = e.target;
            selectedButton.classList.add('selected');
            submitBtn.disabled = false;
        });

        answerButtons.appendChild(button);
    })
}

function resetState() {
    submitBtn.classList.remove('hidden');
    submitBtn.disabled = true;
    nextBtn.classList.add('hidden');

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function submitAnswer() {
    const isCorrect = selectedButton.dataset.isCorrect === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.isCorrect === 'true') {
            button.classList.add('correct');
        }

        button.disabled = true;
    });

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

function showScore() {
    quizScreen.classList.add('hidden');
    scoreScreen.classList.remove('hidden');

    scoreText.innerHTML = `You Scored ${score}/${questions.length} right answers.`;

    resetBtn.addEventListener('click', () => {
        startScreen.classList.remove('hidden');
        scoreScreen.classList.add('hidden');

        currentQuestionIdx = 0;
        score = 0;
        selectedButton = null;
    })
}

function handleNextBtn() {
    currentQuestionIdx++;

    if (currentQuestionIdx < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', () => {
    if (currentQuestionIdx < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});
