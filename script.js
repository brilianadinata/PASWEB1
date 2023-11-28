const questionsElement = document.getElementById("question");
const answerButtons = document.getElementById("jawaban-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", () => selectAnswer(answer.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore() {
    resetState();
    questionsElement.innerHTML = `Skor kamu adalah ${score} dari ${questions.length} soal!`;
    nextButton.innerHTML = "Main Lagi";
    nextButton.style.display = "block";
}

function selectAnswer(correct) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

const questions = [
    {
        questions: "Sungai terbesar di dunia adalah sungai?",
        answers: [
            { text: "Sungai Nil", correct: true },
            { text: "Sungai Amazon", correct: false },
            { text: "Sungai Kuning", correct: false },
            { text: "Sungai Kaliberem", correct: false },
        ]
    },
    {
        questions: "Kapan Indonesia merdeka?",
        answers: [
            { text: "15 Mei 1945", correct: false },
            { text: "17 Agustus 1956", correct: false },
            { text: "17 Agustus 1945", correct: true },
            { text: "15 Mei 1999", correct: false },
        ]
    },
    {
        questions: "Siapa personil Jkt48 gen 7",
        answers: [
            { text: "Fiony", correct: false },
            { text: "Muthe", correct: true },
            { text: "Gracie", correct: false },
            { text: "Shani", correct: false },
        ]
    },
    {
        questions: "Berapa lama Indonesia dijajah oleh Belanda?",
        answers: [
            { text: "3,5 tahun", correct: false },
            { text: "100 tahun", correct: false },
            { text: "350 tahun", correct: true },
            { text: "50 tahun", correct: false },
        ]
    },
    {
        questions: "Apa warna bendera Belanda?",
        answers: [
            { text: "Merah,Hijau,Biru", correct: false },
            { text: "Kuning,Hijau,Merah", correct: false },
            { text: "Merah,Putih,Biru", correct: true },
            { text: "Hijau,Ungu,Kuning", correct: false },
        ]
    },
];

startQuiz();
