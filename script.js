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

// Loop through each option image element
optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        DR.play();
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
                RP: "Computer",
                RS: "You",
                PP: "Draw",
                PR: "You",
                PS: "Computer",
                SS: "Draw",
                SR: "Computer",
                SP: "You",
            };
            
            // Look up the outcome value based on user and CPU options
            let outComeValue = outcomes[userValue + cpuValue];

            // Display the result
            result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Win!!`;

            //Counter of scoreboard
            if (outComeValue === "You") {
                user_Score++;
                document.getElementById('user-score').textContent = user_Score;
                W.play();
            } else if (outComeValue === "Computer") {
                cpu_Score++;
                document.getElementById('cpu-score').textContent = cpu_Score;
                F.play();
            }

            

            if (user_Score > Math.floor(gameMode / 2) ) 
             {
                clearTimeout(time); // Stop further iterations
                

                 user_Score = 0;
                 cpu_Score = 0;
                 document.getElementById('user-score').textContent = user_Score;
                 document.getElementById('cpu-score').textContent = cpu_Score;

                 let rng = Math.floor(Math.random() * 20);
                 let compliments = [ "Well executed!",
                  "Bravo, splendid !",
                 "Phenomenal work !",
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
                 "Un boulot de qualité!"
                 ];
                 let compliment = compliments[rng];
                 let complimentp = document.querySelector(".complimentp");
                complimentp.textContent = userValue === cpuValue ? " " : ` ${compliment}    ${username}`;
                
                var end = Date.now() + (15 * 1000);
                var colors = ['#bb0000', '#ffffff'];

                        (function frame() {
                        confetti({
                            particleCount: 2,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 },
                            colors: colors
                        });
                        confetti({
                            particleCount: 2,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 },
                            colors: colors
                        });

                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                        } ());
               

            }

            if (cpu_Score > Math.floor(gameMode / 2))
            {
            clearTimeout(time); // Stop further iterations


            user_Score = 0;
            cpu_Score = 0;
            document.getElementById('user-score').textContent = user_Score;
            document.getElementById('cpu-score').textContent = cpu_Score;

            let rng = Math.floor(Math.random() * 10);
                let complimentsC = ["Better luck on the next attempt ",
                       "Wishing you success next time around ",
                       "Keep your chin up, and fortune will smile on you next time ",
                       "Tough break this time, but the next one's yours ",
                       "May the odds be in your favor on your next endeavor ",
                       "Unlucky this time, but I believe your fortune will turn around ",
                       "Keep pushing forward; success is waiting for you in the next attempt!",
                       "Next time's the charm; stay resilient ",
                       "The journey might be bumpy, but smoother roads lie ahead.Best of luck next time ",
                       "Here's to a brighter outcome on your next try "
                      ];
            let complimentC = complimentsC[rng];
            let complimentp = document.querySelector(".complimentp");
            complimentp.textContent = userValue === cpuValue ? " " : ` ${complimentC}    ${username}!`;

            

        }
        }, 2500);

    });
});












