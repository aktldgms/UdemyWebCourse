function Soru (questionString, answers, correctAnswer) {
    this.questionString = questionString;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

Soru.prototype.cevapKontrol = function (cevap) {
    if (cevap === 'a' || cevap === 'b' || cevap === 'c' || cevap === 'd')
    {
        return cevap === this.correctAnswer;
    }
    else 
    {
        console.log ("error");
    }
}

function Quiz (quizName, questions) {
    this.quizName = quizName;
    this.questions = questions;
    this.questionIndex = 0;
    this.countOfCorrect = 0;
}

//Add new questions for the quiz or edit the quiz as in the example!
let questions = [
    {name: "footballQuiz", functions: [
        new Soru ("What was the score in the Euro 2012 final?", {a: "2-0", b: "3-0", c: "4-0", d: "5-0"}, 'c'),
        new Soru ("Who won the Man of the Match award in the 2014 World Cup final?", {a: "Mario Goetze", b: "Sergio Aguero", c: "Lionel Messi", d: "Bastian Schweinsteiger"}, 'a'),
        new Soru ("Against which country did Wayne Rooney break the England goalscoring record?", {a: "Switzerland", b: "San Marino", c: "Lithuania", d: "Slovenia"}, 'a'),
        new Soru ("This iconic kit was the 2018 World Cup kit for which country?", {a: "Mexico", b: "Brazil", c: "Nigeria", d: "Costa Rica"}, 'c'),
        new Soru ("After losing a key player in the first game, which team went onto the semi-finals of Euro 2020?", {a: "Denmark", b: "Spain", c: "Wales", d: "England"}, 'a'),
        new Soru ("Who is the current top scorer in the UEFA Champions League?", {a: "Alan Shearer", b: "Thierry Henry", c: "Cristiano Ronaldo", d: "Robert Lewandowski"}, 'c')
    ]},
    {name: "carQuiz", functions: [
        new Soru ("Which group is Bentley a subsidiary of?", {a: "Volkswagen Group", b: "PSA", c: "Ford Motor Company", d: "Hyundai Motor Group"}, 'a'),
        new Soru ("In which city can you find the headquarters of Kia?", {a: "Bangkok", b: "Kuala Lumpur", c: "Singapore", d: "Seoul"}, 'd'),
        new Soru ("Which car brand used the slogan “Sheer Driving Pleasure”?", {a: "Audi", b: "Volvo", c: "Ferrari", d: "BMW"}, 'd'),
        new Soru ("What is the best selling car of all time?", {a: "Toyota Corolla", b: "Volkswagen Golf", c: "Fiat 500", d: "Peugeot 206"}, 'a'),
        new Soru ("Which one of these models is not a pick-up truck?", {a: "Ford Ranger", b: "Peugeot Partner", c: "Nissan Navara", d: "SsangYong Musso"}, 'b')
    ]},
    {name: "basketballQuiz", functions: [
        new Soru ("In which country is basketball a major sport?", {a: "Canada", b: "United States of America", c: "United Kingdom", d: "Jamaica"}, 'b'),
        new Soru ("What is the name of the governing body in the world's top basketball league?", {a: "MLB", b: "NHL", c: "NBA", d: "WNBA"}, 'c'),
        new Soru ("Is there any contact allowed between players in this sport?", {a: "Yes", b: "No", c: "Maybe...", d: "I don't know"}, 'b'),
        new Soru ("How many points is a shot worth when inside the oppositions semi-circle?", {a: "1", b: "2", c: "3", d: "4"}, 'b'),
        new Soru ("For how long is each team allowed to stay in possession of the ball before they must shoot?", {a: "10 seconds", b: "20 seconds", c: "24 seconds", d: "35 seconds"}, 'c'),
        new Soru ("What is it called when a player scores a point?", {a: "Goal", b: "Touchdown", c: "Home-run", d: "A Basket"}, 'd')//,
      //new Soru ("Adın nedir?", {a: "cengiz", b: "kaan"}, 'b)
    ]}//,
  //{name: "GamingQuiz", functions: [
      //new Soru ("Görseldeki oyunun adı nedir?", {a: "Need For Speed Underground 2", b: "Need For Speed Most Wanted", c: "Need For Speed Carbon"}, 'a')
      //new Soru ("Görseldeki oyunun adı nedir?", {a: "Need For Speed Underground 2", b: "Need For Speed Most Wanted", c: "Need For Speed Carbon"}, 'a')
      //new Soru ("Görseldeki oyunun adı nedir?", {a: "Need For Speed Underground 2", b: "Need For Speed Most Wanted", c: "Need For Speed Carbon"}, 'a')
      //new Soru ("Görseldeki oyunun adı nedir?", {a: "Need For Speed Underground 2", b: "Need For Speed Most Wanted", c: "Need For Speed Carbon"}, 'a')
      //new Soru ("Görseldeki oyunun adı nedir?", {a: "Need For Speed Underground 2", b: "Need For Speed Most Wanted", c: "Need For Speed Carbon"}, 'a')
      //...
  //]}
];

//Add new quiz as in the example!
let quizs = [
    new Quiz ("Football", questions[0].functions),
    new Quiz ("Car", questions[1].functions),
    new Quiz ("Basketball", questions[2].functions)//,
  //new Quiz ("Gaming", questions[3].functions) and you must add the questions above!
  //...
];

const quizCard = document.querySelector("#quiz-card");
const quizBtns = document.querySelector(".quiz-buttons");
let currentQuiz;
let left = 9;
let lineWidth = 0;
let line_sayac;
let left_sayac;

function displayQuiz () {
    clearInterval(line_sayac);
    clearInterval(left_sayac);
    left = 9;
    lineWidth = 0;
    quizCard.innerHTML = '';
    quizCard.innerHTML = `
    <div class="containerCustom" style="position: relative;">
            <div class="quiz-title text-center my-3 mt-5" id="quiz-title">
                <div class="d-flex align-items-center justify-content-between">
                    <h1 class="my-0 pb-3">${currentQuiz.quizName} Quiz</h1>
                    <div class="timer d-flex align-items-center">
                        <div class="time_text">
                            Kalan Süre: 
                        </div>
                        <div class="time_left">
                            
                        </div>
                    </div>
                </div>
                <div class="time_line"></div>
            </div>
            <div class="question-count">
                <h3 style="font-weight: 400;">Q${currentQuiz.questionIndex + 1}</h3>
            </div>
            <div class="question-string my-3" id="question-string">
                <p class="lead my-0">${currentQuiz.questions[currentQuiz.questionIndex].questionString}</p>
            </div>
            <div class="options mt-4 mb-5">
                <ul class="option-list" id="option-list">
                    <li onclick="answerCheck(this)" id="a" class="option-list-item"><b>A)</b> ${currentQuiz.questions[currentQuiz.questionIndex].answers.a}</li>
                    <li onclick="answerCheck(this)" id="b" class="option-list-item"><b>B)</b> ${currentQuiz.questions[currentQuiz.questionIndex].answers.b}</li>
                    <li onclick="answerCheck(this)" id="c" class="option-list-item"><b>C)</b> ${currentQuiz.questions[currentQuiz.questionIndex].answers.c}</li>
                    <li onclick="answerCheck(this)" id="d" class="option-list-item"><b>D)</b> ${currentQuiz.questions[currentQuiz.questionIndex].answers.d}</li>
                </ul>
            </div>
            <div class="buttons mb-4 d-flex justify-content-between align-items-center">
                <span style="font-size: 16px; border-radius: 0; background: #ffff93; border: 1px solid #333" class="badge text-dark px-4 py-2">${currentQuiz.questionIndex + 1}/${currentQuiz.questions.length}</span>
                <button onclick="nextQuestion()" id="nxtButton" type="button" class="btn btn-dark">Next Question</button>
            </div>
        </div>
    `;
    document.querySelector(".time_left").innerHTML = 10;
    line_sayac = setInterval(line_timer, 5);
    left_sayac = setInterval(left_timer, 1000);
    
    let nxtButton = document.querySelector("#nxtButton");
    nxtButton.classList.add("d-none-next");
}

function displayFinished () {
    quizBtns.classList.add("d-none");
    quizCard.innerHTML = "";
    quizCard.innerHTML = `<div class="containerCustom finito">
    <div class="quiz-title text-center my-3" id="quiz-title">
        <h1 class="my-0">Finished the Quiz!</h1>
    </div>
    <div class="question-count text-center">
        <h3 style="font-weight: 400;">You are ${(currentQuiz.countOfCorrect >= (currentQuiz.questions.length - currentQuiz.countOfCorrect)) ? "Win" : "Lose"}!</h3>
    </div>
    <div class="question-string text-center my-5" id="question-string">
        <p class="lead my-0">Count of Correct Answers: ${currentQuiz.countOfCorrect}</p>
        <p class="lead my-0">Count of Wrong Answers: ${(currentQuiz.questions.length - currentQuiz.countOfCorrect)}</p>
    </div>
    <div class="text-center mt-5">
        <a href="index.html"><button type="button" class="btn btn-dark">Reset</button></a>
    </div>
</div>`;
}

function quiz_button (id) {
    if(!quizCard.classList.contains("show-quiz")) {
        quizCard.classList.add("show-quiz");
        if (currentQuiz != null) {
            currentQuiz.questionIndex = 0;
        }
        for(var i = 0; i < quizs.length; i++) {
            if( id == quizs[i].quizName) {
                currentQuiz = quizs[i];
            }
        }
        for (quiz of quizs) {
            var btn = document.querySelector("#" + quiz.quizName);
            if (btn.id != currentQuiz.quizName && !btn.classList.contains("d-none")) {
                btn.classList.add("d-none");
            }
            else if(btn.id == currentQuiz.quizName) {
                btn.innerHTML = "Cancel Quiz";
            }
        }
        quizBtns.children[0].classList.add("d-none");
        displayQuiz ();
    }
    else {
        for (quiz of quizs) {
            var btn = document.querySelector("#" + quiz.quizName);
            if (btn.innerHTML == "Cancel Quiz") {
                btn.innerHTML = quiz.quizName + " Quiz";
            }
            else {
                btn.classList.remove("d-none");
            }
        }
        displayQuiz ();
        clearInterval(left_sayac);
        clearInterval(line_sayac);
        quizCard.classList.remove("show-quiz");
        quizBtns.children[0].classList.remove("d-none");
    }
}

function nextQuestion() {
    if (currentQuiz.questionIndex < currentQuiz.questions.length - 1) {
        currentQuiz.questionIndex++;
        displayQuiz ();
        if (currentQuiz.questionIndex >= currentQuiz.questions.length - 1) {
            nxtButton.innerHTML = "Finish and See the Result";
        }
    }
    else {
        displayFinished ();
    }
}

function answerCheck(thiss) {
    let options = thiss.parentElement.children;
    let nxtButton = document.querySelector("#nxtButton");
    nxtButton.classList.remove("d-none-next");
    if(!thiss.classList.contains("list-off")) {
        if(!currentQuiz.questions[currentQuiz.questionIndex].cevapKontrol(thiss.id)) {
            for(option of options) {
                if (option.id == thiss.id) {
                    option.classList.add("answer-wrong");
                }
                else if (currentQuiz.questions[currentQuiz.questionIndex].cevapKontrol(option.id)) {
                    option.classList.add("answer-correct");
                }
            }
        }
        else {
            thiss.classList.add("answer-correct");
            currentQuiz.countOfCorrect++;
        }
        clearInterval(left_sayac);
        clearInterval(line_sayac);
    }
    for (option of options) {
        option.classList.add("list-off");
    }
}

function line_timer () {
    let line = document.querySelector(".time_line");
    if (lineWidth >= 744) {
        clearInterval(line_sayac);
    }
    else {
        lineWidth += 0.365;
    }
    line.style.width = lineWidth + "px";
}

function left_timer () {
    let options = document.querySelectorAll(".option-list-item");
    time_left = document.querySelector(".time_left");
    time_left.innerHTML = left;
    if (left <= 0) {
        for(option of options) {
            if (option.id == currentQuiz.questions[currentQuiz.questionIndex].correctAnswer) {
                option.classList.add("answer-correct");
            }
            option.classList.add("list-off");
            nxtButton.classList.remove("d-none-next");
        }
        clearInterval(left_sayac);
    }
    else {
        left -= 1;
    }
    console.log ("a");
}