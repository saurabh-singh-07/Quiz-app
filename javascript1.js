const questions = [
{
    question : "Which is largest animal in the world ?",
    answers : [
    {text:"Shark", correct : false},
    {text:"Blue whale", correct : true},
    {text:"Elephant", correct : false},
    {text:"Gireffe", correct : false},]},
{
    question : "which is the smallest country in the world ?",
    answers : [
    {text:"Vatican city", correct : true},
    {text:"Bhutan", correct : false},
    {text:"Nepal", correct : false},
    {text:"Shri Lanka", correct : false},]},
{
    question : "Which is largest desert in the world ?",
    answers : [
    {text:"Kalahari", correct : false},
    {text:"Gobi", correct : false},
    {text:"Sahara", correct : false},
    {text:"Antarctica", correct : true},]},
{
    question : "Which is smallest continent in the world ?",
    answers : [
    {text:"Asia", correct : false},
    {text:"Australia", correct : true},
    {text:"Arctic", correct : false},
    {text:"Africa", correct : false},]},
];
const questionElement = document.getElementById("question");
const answerbtn = document.getElementById("answer-btn");
const nextbtn = document.getElementById("nextbtn");

let currentQuestionindex = 0;
let score = 0;

function startquiz(){
    currentQuestionindex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showquestion();
}
function showquestion(){
    resetstate();
    let currentquestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentquestion.question;
    
    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}
function resetstate(){
    nextbtn.style.display="none";
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild);
    }
}
function selectanswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct=== "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbtn.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display="block";
}
nextbtn.addEventListener("click",() =>{
    if(currentQuestionindex < questions.length){
        handlenextbtn();
    }else{
        startquiz();
    }
})
function handlenextbtn(){
    currentQuestionindex++;
    if(currentQuestionindex<questions.length){
        showquestion();
    }else{
        showscore();
    }
}
function showscore(){
    resetstate();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML="play again";
    nextbtn.style.display="block";
}
startquiz();