// Select timer element by ID
let timer = document.getElementById("timer");

// Select start button by ID
let startButton = document.getElementById("start-button");

// Define variables for the game area and the list to hold the answer choices
let gameArea = document.getElementById("gamespace");
let answerList = document.createElement("ul");

// Define variable for remaining time
let timeLeft = 75;

// Define variable for which question the player is currently on
let questionNum = 0;

// Define variables for number of questions right and wrong
let numWrong = 0;
let numRight = 0;

// Create an array of objects to handle each question and its corrects
let questionBank = [
    {
        question: "Commonly used data types do NOT include ____",
        options: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within ___",
        options: ["quotations", "curly braces", "parentheses", "square brackets"],
        correct: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ___",
        options: ["numbers", "other arrays", "booleans", "all of the above"],
        correct: "d) all of the above"
    },
    {
        question: "String value must be enclosed within ___ when being assigned to variables.",
        options: ["commas", "curly braces", "quotations", "parentheses"],
        correct: "quotations"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is ___",
        options: ["JavaScript", "b) Terminal/Bash", "alerts", "console.log"],
        correct: "console.log"
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
            // gameOver();
        }

    }, 1000);
    questionPopulate(questionNum)

}

function questionPopulate(questionNum) {
    // Clear the current game area and question lists if applicable
    gameArea.innerHTML = "";
    answerList.innerHTML = "";

    let thisQuestion = questionBank[questionNum].question;
    let theseOptions = questionBank[questionNum].options;

    console.log(theseOptions);

    gameArea.textContent = thisQuestion;

    gameArea.appendChild(answerList);

    for (i = 0; i < theseOptions.length; i++) {
        let item = document.createElement("li");
        item.setAttribute("class","choice");
        item.textContent = theseOptions[i];
        answerList.appendChild(item);
    }
    
    answerList.addEventListener("click", rightOrWrong);
}

function rightOrWrong (event) {

    // If user clicks outside of the list items, return to questionPopulate()
    if (!event.target.matches("li")) {
        questionPopulate(questionNum);
    }
    else {
        // Assign variable to hold user's selected response    
        let userAnswer = event.target.textContent;
        // Create a div for the area to display right or wrong text
        let answerNotify = document.createElement("li");

        // Check if user's answer matches the correct or incorrect answer and display result
        if (userAnswer === questionBank[questionNum].correct) {
            numRight++;
            answerNotify.textContent = "Correct!";
            answerNotify.setAttribute("class", "correct");
            answerList.appendChild(answerNotify);

        }
        else {
            timeLeft = timeLeft - 10;
            answerNotify.textContent = "Incorrect! (-10s)";
            answerNotify.setAttribute("class", "incorrect");
            answerList.appendChild(answerNotify);
        }
        // Increment to next question
        questionNum++;

        // If statement to bring user to highscore screen if this is the last question
        if (questionNum > questionNum.length) {
            // gameEnd();
        }
        // Else statement to continue to next question with a 500ms delay to allow correct or incorrect display to occur
        else {
            setTimeout(function() {
                questionPopulate(questionNum);
            }, 500)
        }

    }

}


startButton.addEventListener("click", startTimer);