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

//============================================================== retrieving the variables from the window  ====================================================================
const urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get('username') || 'Human';
document.querySelector('.complimentp').textContent = `Welcome, ${username}!`;
document.querySelector('.user_name').textContent = `${username}`;

let gameMode = parseInt(urlParams.get('mode')) || 3; // Default to best of 3





//============================================================================================================================================================================

// Get  to DOM elements
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const cpuResult = document.querySelector(".cpu_result img");
let user_Score = 0;
let cpu_Score = 0;
const user_score_span = document.getElementById("user-score");
const cpu_score_span = document.getElementById("cpu-score");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");
let DR = document.getElementById("drum_roll");
let F = document.getElementById("fail");
let W = document.getElementById("win");

function clickEventHandler(e) {
    DR.play();
    
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    optionImages.forEach((image2, index2) => {
        index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    let time = setTimeout(() => {
        gameContainer.classList.remove("start");

        let imageSrc = e.target.querySelector("img").src;
        userResult.src = imageSrc;

        let randomNumber = Math.floor(Math.random() * 3);
        let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
        cpuResult.src = cpuImages[randomNumber];

        let cpuValue = ["R", "P", "S"][randomNumber];
        let userValue = ["R", "P", "S"][index];

        let outcomes = {
            RR: "Draw",
            RP: "Computer",
            RS: "You",
            PP: "Draw",
            PR: "You",
            PS: "Computer",
            SS: "Draw",
            SR: "Computer",
            SP: "You",
        };

        let outComeValue = outcomes[userValue + cpuValue];

        result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Win!!`;

        if (outComeValue === "You") {
            user_Score++;
            user_score_span.textContent = user_Score; // Fix: Update user_score_span.textContent
            W.play();
        } else if (outComeValue === "Computer") {
            cpu_Score++;
            cpu_score_span.textContent = cpu_Score; // Fix: Update cpu_score_span.textContent
            F.play();
        }

        if (user_Score > Math.floor(optionImages.length / 2)) {
            clearTimeout(time); // Stop further iterations

            user_Score = 0;
            cpu_Score = 0;
            user_score_span.textContent = user_Score;
            cpu_score_span.textContent = cpu_Score;

            let rng = Math.floor(Math.random() * 20);
            let compliments = ["Well executed!", "Bravo, splendid!", "Phenomenal work !",
                "You nailed it !",
                "Exceptional effort !",
                "Kudos on a great job !",
                "Stellar performance !",
                "Remarkable workmanship !",
                "Admirable achievement !",
                "Commendable effort !",
                "Travail remarquable !",
                "Félicitations, superbe !",
                "Performance exceptionnelle !",
                "Vous avez assuré !",
                "Effort remarquable !",
                "Bravo pour ce travail impeccable !",
                "Prestation impressionnante !",
                "Réalisation remarquable !",
                "Effort louable!",
                "Un boulot de qualité!"];
            let compliment = compliments[rng];
            let complimentp = document.querySelector(".complimentp");
            complimentp.textContent = userValue === cpuValue ? " " : ` ${compliment}    ${username}`;

            // Remove the click event listener
            optionImages.forEach((image) => {
                image.removeEventListener("click", clickEventHandler);
            });
        }
    }, 2500);
}

// Add the click event listener to each option image
optionImages.forEach((image, index) => {
    image.addEventListener("click", clickEventHandler);
});