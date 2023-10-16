function Soru (soruMetni, secenekler, dogruCevap) {
    this.soruMetni = soruMetni;
    this.secenekler = secenekler;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevapKontrol = function (cevap) {
    return this.dogruCevap === cevap;
}

let soru_kumesi = [
    new Soru( "Who is known for inventing the gas-powered internal combustion engine?",
     {a: "Henry Ford", b: "Karl Benz", c: "Nicolaus Otto", d: "Sebastian Vettel"},
      "D"),
    new Soru( "When did Paul Walker die?",
     {a: "2011", b: "2012", c: "2013", d: "2014"},
      "C"),
    new Soru( "The headquarters of Volvo Group is located in which city?"
    , {a: "Gothenburg, Sweden", b: "Oslo, Norway", c: "Copenhagen, Denmark", d: "Istanbul, Turkey"},
     "D"),
    new Soru( "In the logo of Audi, how many rings are there?",
     {a: "2 rings", b: "3 rings", c: "4 rings", d: "5 rings"},
      "C"),
    new Soru( "What is the smallest car model ever made?",
    {a: 'BMW Isetta "Bubble Car"', b: "Peel P50", c: "Cadillac Eldorado Convertible", d: "Recep İvedik's Car"},
    "D"),
    new Soru( "ABS is a safety feature in many modern car models. What does it stand for?",
     {a: "Anti-lock block system", b: "Anti-lock braking system", c: "Anti-lock bear system", d: "Anti-lock blockchain system"},
      "B"),
    new Soru( "Which of the following car models is driven by the famous secret agent James Bond?",
    {a: "DeLorean DMC-12", b: "Aston Martin DB5", c: "Herbie", d: "Ford Mustang Mach 1"},
    "B")
];

function Quiz (sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
    this.rightAnswerCount = 0;
}

Quiz.prototype.soruGetir = function () {
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz (soru_kumesi);
const startButton = document.querySelector("#start");
const quizDiv = document.querySelector("#quiz");
const quizContent = document.querySelector("#quiz .container");
const nextButton = document.querySelector("#nextButton");
let basari;


function startTheQuiz () {
    quizDiv.classList.add("active");
    displaySoru ();
    quiz.soruIndex++;
}

function updateTheQuiz () {
    if (quiz.soruIndex >= soru_kumesi.length) {
        finishQuiz ();
        nextButton.parentElement.classList.add("d-none");
        nextButton.parentElement.classList.remove("d-flex");
    }
    else {   
        displaySoru ();
        quiz.soruIndex++;
        nextButton.parentElement.classList.add("d-none");
        nextButton.parentElement.classList.remove("d-flex");
    }
}

function finishQuiz () {
    if(quiz.sorular.length - quiz.rightAnswerCount > quiz.rightAnswerCount) {
        basari = "UNSUCCESS";
    }
    else if(quiz.sorular.length - quiz.rightAnswerCount <= quiz.rightAnswerCount) {
        basari = "SUCCESS";
    }
    quizContent.innerHTML = "";
    let soru = `<div class="title text-center my-5">
                    <h1>FINISHED QUIZ</h1>
                </div>
                <div class="text-center" style="margin-top: 8rem;">
                    <p class"lead" style="font-size: 20px;">Count of Correct Answer: ${quiz.rightAnswerCount}</p>
                    <p class"lead" style="font-size: 20px;">Count of Wrong Answer: ${quiz.sorular.length - quiz.rightAnswerCount}</p>
                    <p id="basari" class"lead" style="font-size: 24px;">${basari}</p>
                </div>
                <div class="buttonlar text-center">
                    <button onclick="reset()" id="restartButton" type="button" class="btn btn-outline-dark" style="margin-top: 12rem;">Reset</button>
                </div>`;

    quizContent.innerHTML = soru;

    if(basari == "UNSUCCESS") {
       document.querySelector("#basari").classList.add("text-danger");
       document.querySelector("#basari").classList.remove("text-success");
    }
    else if(basari == "SUCCESS") {
       document.querySelector("#basari").classList.add("text-success");
       document.querySelector("#basari").classList.remove("text-danger");
    }
}

function displaySoru () {
    quizContent.innerHTML = "";
    let soru = `<div class="title text-center mt-3">
                    <h1>Quiz</h1>
                </div>
                <div class="soruCount mt-5">
                    <h3>Question ${quiz.soruIndex + 1}</h3>
                </div>
                <div class="soruMetni mt-4">
                    <p class="lead">${quiz.soruGetir().soruMetni}</p>
                </div>
                <div class="secenekler mt-2">
                    <ul class="list-group">
                        <li onclick="marker(this)" class="list-group-item"><b>A: </b>${quiz.soruGetir().secenekler.a}</li>
                        <li onclick="marker(this)" class="list-group-item"><b>B: </b>${quiz.soruGetir().secenekler.b}</li>
                        <li onclick="marker(this)" class="list-group-item"><b>C: </b>${quiz.soruGetir().secenekler.c}</li>
                        <li onclick="marker(this)" class="list-group-item"><b>D: </b>${quiz.soruGetir().secenekler.d}</li>
                    </ul>
                </div>`;
    
    quizContent.innerHTML = soru;
}

startButton.addEventListener ("click", startTheQuiz);
nextButton.addEventListener ("click", updateTheQuiz);

function marker(answer) {
    let answerParent = answer.parentElement;
    if (!quiz.sorular[quiz.soruIndex - 1].cevapKontrol(answer.innerText[0])) {
        answer.classList.add("wrong-answer");
        for (let a of answerParent.children) {
            if(quiz.sorular[quiz.soruIndex - 1].cevapKontrol(a.innerText[0])) {
                a.classList.add("right-answer");
            }
            a.removeAttribute("onclick");
        }
        nextButton.parentElement.classList.add("d-flex");
        nextButton.parentElement.classList.remove("d-none");
    }
    else if (quiz.sorular[quiz.soruIndex - 1].cevapKontrol(answer.innerText[0])) {
        answer.classList.add("right-answer");
        for (let a of answerParent.children) {
            a.removeAttribute("onclick");
        }
        quiz.rightAnswerCount++;
        nextButton.parentElement.classList.add("d-flex");
        nextButton.parentElement.classList.remove("d-none");
    }
}

function reset () {
    quiz.soruIndex = 0;
    quiz.rightAnswerCount = 0;
    quizDiv.classList.remove("active");
    nextButton.classList.remove("d-none");
}