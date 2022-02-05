console.log("Score: 70 \nВерстка: + 10\nИзображение меняется: + 10\nЗвук меняется: + 10\nАктивный элемент выделяется стилем: + 10\nКнопка play/pause + 20\nНе предусмотренный в задании функционал: +10 \n- Добавлен +1 интерактивный элемент: \"Лес после дождя\"\n- Имеется local storage\n- Добавлена анимация кнопки\n- Добавлено боковое меню с плавной анимацией и описанием сайта");

const navItem = document.querySelectorAll('.nav-item');

const playButton = document.querySelector('.play-button');
const playButtonImage = document.querySelector('.play-button-image');
let isPlay = false;
let currentBird = "forest";
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
    currentBird = event.target.dataset.bird;
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
        menuButton.classList.remove('active');
    } else {
        menuButton.classList.add('active');
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
    playButton.appendChild(document.createElement('span'));
    setTimeout(function(){
        document.querySelector('.play-button > span').remove()
    }, 1000)
}

function setLocalStorage() {
    localStorage.setItem('bird', currentBird);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('bird')) {
        currentBird = localStorage.getItem('bird');
        navItem.forEach((item) => item.classList.remove('active'));
        document.querySelector(`.nav-item[data-bird=${currentBird}]`).classList.add('active');
        audio.src = `./assets/audio/${currentBird}.mp3`;
        backgroundImage.style.backgroundImage = `url('./assets/img/${currentBird}.jpg')`;
    } else {
        audio.src = `./assets/audio/${currentBird}.mp3`;
        backgroundImage.style.backgroundImage = `url('./assets/img/${currentBird}.jpg')`;
    }
}
window.addEventListener('load', getLocalStorage);