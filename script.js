// Select timer element by ID
let timer = document.getElementById("timer");

// Select start button by ID
let startButton = document.getElementById("start-button");

// Define variable for remaining time
let timeLeft = 75;

// Create an array of objects to handle each question and its corrects
let questionBank = [
    {
        question: "Commonly used data types do NOT include: ___",
        options: ["a) strings", "b) booleans", "c) alerts", "d) numbers"],
        correct: "c) alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within: ___",
        options: ["a) quotations", "b) curly braces", "c) parentheses", "d) square brackets"],
        correct: "c) parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store: ___",
        options: ["a) numbers", "b) other arrays", "c) booleans", "d) all of the above"],
        correct: "d) all of the above"
    },
    {
        question: "String value must be enclosed within ___ when being assigned to variables.",
        options: ["a) commas", "b) curly braces", "c) quotations", "d) parentheses"],
        correct: "c) quotations"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ___",
        options: ["a) JavaScript", "b) terminal/bash", "c) alerts", "d) console.log"],
        correct: "d) console.log"
    },
]

function startTimer () {
    // Create interval function to handle the timer

    // Initial time display to handle starting time remaining value
    timer.textContent = "Time: " + timeLeft;  

    // Call setInterval function to create timer countdown
    let timeId = setInterval(function () {

        timeLeft --;
        timer.textContent = "Time: " + timeLeft;
        
        // End condition for time elapsed scenario
        if (timeLeft === 0) {
            clearInterval(timeId);
            gameOver();
        }

    }, 1000);
    questionPopulate()

}

function questionPopulate() {

}

// function gameOver {

// }


startButton.addEventListener("click", startTimer);