// Get the theme toggle switch
const themeToggle = document.getElementById('theme-toggle');

// Check if the user prefers dark mode and toggle the class
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

// Function to toggle between light and dark modes
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// Retrieve game mode from URL
const urlParams = new URLSearchParams(window.location.search);
const gameMode = parseInt(urlParams.get('mode')) || 3; // Default to best of 3

let userScore = 0;
let cpuScore = 0;

// ... Inside your timeout function where you determine the winner ...

if (outComeValue === 'User') {
    userScore++;
} else if (outComeValue === 'BOT') {
    cpuScore++;
}

// Update the scoreboard (assuming you have elements to display the scores)
document.getElementById('user-score').textContent = userScore;
document.getElementById('cpu-score').textContent = cpuScore;

// Check if someone won the game
if (userScore > gameMode / 2 || cpuScore > gameMode / 2) {
    // Display the winner and possibly restart or go to the game mode selection
}

// Get  to DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;

      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw",
        RP: "BOT",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "BOT",
        SS: "Draw",
        SR: "BOT",
        SP: "User",
      };

      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];

      // Display the result
      result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
    }, 2500);
  });
});
