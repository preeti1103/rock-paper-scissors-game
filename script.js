const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

updateScoreElement();


let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;

        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;

        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    }
}

//Rock button
document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

//Paper button
document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

//Scissor button
document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

//AutoPlay button
document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    autoPlay();
});

//r=rock p=paper s=scissors a=autoplay by keyboard:
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }
    else if (event.key === 'a') {
        autoPlay();
    }
    else if (event.key === 'Backspace') {
        showResetConfirmation();
    }
});

// Reset button
document.querySelector('.js-reset-button').addEventListener('click', () => {
    showResetConfirmation();
});

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
        .innerHTML = `Are you sure you want to reset the score?
        <button class="js-reset-confirmation-yes reset-confirmation-button">Yes</button>
        <button class="js-reset-confirmation-no reset-confirmation-button">No</button>`;

    document.querySelector('.js-reset-confirmation-yes').addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        hideResetConfirmation();
    });

    document.querySelector('.js-reset-confirmation-no').addEventListener('click', () => {
        hideResetConfirmation();
    });
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    document.querySelector('.js-result').classList.remove('win-animation', 'lose-animation', 'tie-animation');

    if (playerMove === 'scissors') {
        if (computerMove === 'scissors') {
            result = 'Tie';
        }
        else if (computerMove === 'rock') {
            result = 'You Lose';
        }
        else if (computerMove === 'paper') {
            result = 'You Win';
        }
    }

    else if (playerMove === 'paper') {
        if (computerMove === 'paper') {
            result = 'Tie';
        }
        else if (computerMove === 'scissors') {
            result = 'You Lose';
        }
        else if (computerMove === 'rock') {
            result = 'You Win';
        }
    }

    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        }
        else if (computerMove === 'paper') {
            result = 'You Lose';
        }
        else if (computerMove === 'scissors') {
            result = 'You Win';
        }
    }

    if (result === 'You Win') {
        score.wins += 1;
        document.querySelector('.js-result').classList.add('win-animation');
    }
    else if (result === 'You Lose') {
        score.losses += 1;
        document.querySelector('.js-result').classList.add('lose-animation');
    }
    else if (result === 'Tie') {
        score.ties += 1;
        document.querySelector('.js-result').classList.add('tie-animation');
    }

    //confetti
    if (result === 'You Win') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `You: <img class="move-pic" src="images/${playerMove}-emoji.png">  
                Computer: <img class="move-pic" src="images/${computerMove}-emoji.png">`;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}

//how to play
window.onload = function () {
    const modal = document.getElementById('howToPlay');
    const closeBtn = document.getElementById('closeHowToPlay');
    const game = document.getElementById('game');

    // Show modal when page loads
    modal.style.display = 'block';
    game.style.display = 'none';

    // Close modal when button clicked
    closeBtn.onclick = function () {
        modal.style.display = 'none';
        game.style.display = 'block';
    };
};
