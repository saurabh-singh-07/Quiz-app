const questions = [
{
    question : "Which is largest animal in the world ?",
    answers : [
    {text:"Shark", correct : false},
    {text:"Blue whale", correct : true},
    {text:"Elephant", correct : false},
    {text:"Gireffe", correct : false}]},
{
    question : "which is the smallest country in the world ?",
    answers : [
    {text:"Vatican city", correct : true},
    {text:"Bhutan", correct : false},
    {text:"Nepal", correct : false},
    {text:"Shri Lanka", correct : false}]},
{
    question : "Which is largest desert in the world ?",
    answers : [
    {text:"Kalahari", correct : false},
    {text:"Gobi", correct : false},
    {text:"Sahara", correct : false},
    {text:"Antarctica", correct : true}]},
{
    question : "Which is smallest continent in the world ?",
    answers : [
    {text:"Asia", correct : false},
    {text:"Australia", correct : true},
    {text:"Arctic", correct : false},
    {text:"Africa", correct : false}]},
];
const QuestionElement = document.getElementById("question");
const Answerbtn = document.getElementById("answerbtn");
const nextbtn = document.getElementById("nextbtn");

let CurrentQuestionIndex = 0;
let score = 0;
function Startquiz(){
    CurrentQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML= "next";
    ShowQuestion();  
}

function ShowQuestion(){
    ResetState();
    let CurrentQuestion = questions[CurrentQuestionIndex];
    let QuestionNo = CurrentQuestionIndex + 1;
    QuestionElement.innerHTML = QuestionNo + ". " + CurrentQuestion.question;
    
    CurrentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        Answerbtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", SelectedAnswer);
    });
}

function ResetState(){
    nextbtn.style.display="none";
    while(Answerbtn.firstChild){
        Answerbtn.removeChild(Answerbtn.firstChild);
    }
}

function SelectedAnswer(e){
    const select = e.target;
    const iscorrect = select.dataset.correct==="true";
    if(iscorrect){
        select.classList.add("correct");
        score++;
    }else{
        select.classList.add("incorrect");
    }
    Array.from(Answerbtn.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display="block";
}
nextbtn.addEventListener("click", ()=>{
    if(CurrentQuestionIndex < questions.length){
        HandleNextbtn();
    }else{
        Startquiz();
    }
});

function HandleNextbtn(){
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex < questions.length){
        ShowQuestion();
    }else{
        ShowScore();
    }
}

function ShowScore(){
    ResetState();
    QuestionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display="block";
}

Startquiz();