// Select timer element by ID
let timer = document.getElementById("timer");

// Define variable for remaining time
let timeLeft = 5;


function startTimer () {
    // Create interval function to handle the timer

    // Initial time display to handle starting time remaining value
    timer.textContent = "Time: " + timeLeft;  

    let timeId = setInterval(function () {

        timeLeft --;
        timer.textContent = "Time: " + timeLeft;
        
        // End condition for time elapsed scenario
        if (timeLeft === 0) {
            clearInterval(timeId);
            gameOver();
        }

    }, 1000);
}

// function gameOver {

// }


startTimer()