// Select timer element by ID
let timer = document.getElementById("timer");
// Declare global variable for interval so it can be called outside the function
let timeId = 0;

// Select start button by ID
let startButton = document.getElementById("start-button");

// Define variables for the game area and the list to hold the answer choices
let gameArea = document.getElementById("gamespace");
let answerList = document.createElement("ul");

// Define variable for remaining time
let timeLeft = 75;

// Define variable for which question the player is currently on
let questionNum = 0;

// Define variables for number of questions right
let numRight = 0;

let scoreLink = document.getElementById("highscores");
scoreLink.onclick = gameEnd;

let userScore = 0;
let userInitials = "";

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
        correct: "all of the above"
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        options: ["commas", "curly braces", "quotations", "parentheses"],
        correct: "quotations"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is ___",
        options: ["JavaScript", "Terminal/Bash", "alerts", "console.log"],
        correct: "console.log"
    },
]

function startTimer () {
    // Create interval function to handle the timer

    // Initial time display to handle starting time remaining value
    timer.textContent = "Time: " + timeLeft;  

    // Call setInterval function to create timer countdown
    timeId = setInterval(function () {

        timeLeft --;
        timer.textContent = "Time: " + timeLeft;
        
        // End condition for time elapsed scenario
        if (timeLeft === 0) {
            clearInterval(timeId);
            gameEnd();
        }

    }, 1000);
    questionPopulate(questionNum)

}

function questionPopulate(questionNum) {
    // Clear the current game area and question lists if applicable
    gameArea.innerHTML = "";
    answerList.innerHTML = "";
    console.log(timeId);

    // Create variables from questionBank array to hold current question and current answer options
    let thisQuestion = questionBank[questionNum].question;
    let theseOptions = questionBank[questionNum].options;

    // Set and display the text of the question in the game area
    gameArea.textContent = thisQuestion;

    // Append the currently empty list to the game area
    gameArea.appendChild(answerList);

    // Iterate over the current answer options to append them to the list one-by-one
    for (i = 0; i < theseOptions.length; i++) {
        let item = document.createElement("li");
        item.setAttribute("class","choice");
        item.textContent = theseOptions[i];
        answerList.appendChild(item);
    }
    
    // Add event listener to wait for user to click and call the rightOrWrong function to determine whether the choice was correct or incorrect
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

        // If statement to bring user to highscore screen if this is the last question (with 500ms delay to display correct/incorrect)
        if (questionNum === questionBank.length) {
            setTimeout(function() {
                gameEnd();
            }, 500)
        }
        // Else statement to continue to next question with a 500ms delay to allow correct or incorrect display to occur
        else {
            setTimeout(function() {
                questionPopulate(questionNum);
            }, 500)
        }

    }

}

function gameEnd(){
    // Stop timer if it has been started
    if (timeId > 0) {
    clearInterval(timeId);
    }

    // Clear the game area
    gameArea.innerHTML = "";
    answerList.innerHTML = "";

    // Calculate user score and store it in a variable
    userScore = (numRight*10 + Math.round(timeLeft/2));

    // Set text content of game area
    gameArea.textContent = "All done!\nYour final score is " + userScore;

    // Create the form for score submission and add the necessary elements
    let scoreSubmit = document.createElement("form");
    gameArea.appendChild(scoreSubmit);

    let userInitials = document.createElement("label");
    userInitials.textContent = "Enter initials: ";
    scoreSubmit.appendChild(userInitials);

    let inputScore = document.createElement("input");
    inputScore.setAttribute("type", "text");
    scoreSubmit.appendChild(inputScore);

    let submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    scoreSubmit.appendChild(submitBtn);
    
    // Event listener for submit button with reference to high score page function
    submitBtn.addEventListener("click", highScore);

}

function highScore() {
    // Clear page
    gameArea.innerHTML = "";

    gameArea.textContent = "Highscores";
    let scoreList = document.createElement("ul");
    gameArea.appendChild(scoreList);

    let scoreItem = document.createElement("li");
    scoreItem.textContent = userInitials + " :" + userScore;
    scoreList.appendChild(scoreItem);
}


startButton.addEventListener("click", startTimer);