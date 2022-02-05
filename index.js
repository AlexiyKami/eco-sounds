const navItem = document.querySelectorAll('.nav-item');

const playButton = document.querySelector('.play-button');
const playButtonImage = document.querySelector('.play-button-image');
let isPlay = false;
const audio = new Audio();

const backgroundImage = document.querySelector('.main-container');

const menuButton = document.querySelector('.question-btn');
const questionMenu = document.querySelector('.question-menu');

navItem.forEach((item) => item.addEventListener("click", selectNavItem));
playButton.addEventListener("click", togglePlay);
menuButton.addEventListener("click", toggleMenu);

function selectNavItem(event) {
    pauseAudio();
    navItem.forEach((item) => item.classList.remove('active'));
    event.target.classList.add('active');
    audio.src = `./assets/audio/${event.target.dataset.bird}.mp3`;
    backgroundImage.style.backgroundImage = `url('./assets/img/${event.target.dataset.bird}.jpg')`;
}

function togglePlay() {
    if(isPlay === false && audio.src !== "") {
        animateButton(); 
        playAudio();
    } else if (isPlay === true) {
        animateButton();
        pauseAudio();
    }
}

function toggleMenu() {
    if(questionMenu.classList.contains('active')) {
        questionMenu.classList.remove('active');
    } else {
        questionMenu.classList.add('active');
    }
}

function playAudio() {   
    isPlay = true;
    playButtonImage.src = 'assets/svg/pause.svg'
    audio.currentTime = 0;
    audio.play();
}

function pauseAudio() {
    isPlay = false;
    playButtonImage.src = 'assets/svg/play.svg'
    audio.pause();
}

function animateButton() {
    console.log("hello-world")
    playButton.appendChild(document.createElement('span'));
    setTimeout(function(){
        document.querySelector('.play-button > span').remove()
    }, 1000)
}