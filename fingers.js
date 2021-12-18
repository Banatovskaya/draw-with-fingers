"use strict";
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const btn = document.querySelectorAll("button")[0];
const showVideoButton = document.querySelectorAll("button")[1];
const video = document.querySelector(".video");
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight;
context.shadowBlur = 25;
context.shadowColor = "black";
let isShowVideo = false;

showVideoButton.addEventListener("click", function () {
    video.classList.toggle("nonevideo");
    isShowVideo = !isShowVideo;
    changeShowVideoButton()
});

function changeShowVideoButton() {
    if (isShowVideo) {
        showVideoButton.innerHTML = "Close video"
    } else {
        showVideoButton.innerHTML = "Demo video"
    }
}

btn.addEventListener("click", function () {
    // document.location.reload(true);
    context.clearRect(0, 0, 2000, 1500);
});

let x, x0 = 0;
let y, y0 = 0;
let isDrawing = false;
let color = "red";

function getColor(number) {
    const colorObj = {
        1: "red",
        2: "orange",
        3: "blue",
        4: "green",
        5: "yellow",
        6: "violet",
        7: "#33CCCC",
        8: "#CCFF00",
        9: "#9933FF",
    }

    for (let i = 1; i <= number; i++) {
        if (i < number) {
            if (color == colorObj[i]) {
                return color = colorObj[i + 1];
            }
        } else if (color == colorObj[number]) {
            return color = colorObj[1];
        }
    }
}

function drawing(x0, y0, x, y, number) {
    requestAnimationFrame(function () {
            context.beginPath();
            context.lineWidth = "5";
            context.strokeStyle = getColor(number);
            context.moveTo(x0, y0);
            context.lineTo(x, y);
            context.stroke();
        }
    )
}

let div = document.createElement('div');
canvas.addEventListener("mousedown", function (event) {
    isDrawing = true;
    x0 = event.clientX;
    y0 = event.clientY;
    div.innerHTML = "Это приложение предназначено для работы с touch-устройством \n Запустите приложение и дотронтесь до touch-устройства несколькими пальцами, \n медленно передвигая их. Для просмотра нажмите ДЕМО";
    div.style.position = 'absolute'
    event.preventDefault();
}, {
    once: false
});

canvas.addEventListener("mousemove", function (event) {
    if (isDrawing) {
        x = event.clientX;
        y = event.clientY;
        div.style.fontSize = "30px"
        div.style.left = x + 50 + 'px';
        div.style.top = y + 50 + 'px';
        document.body.append(div)
    };
    event.preventDefault();
}, {
    once: false
});

canvas.addEventListener("mouseup", function (event) {
    isDrawing = false;
    event.preventDefault();
}, {
    once: false
});

/// touch-event

canvas.addEventListener("touchstart", function (event) {
    for (let i = 0; i < event.changedTouches.length; i++) {
        x0 = event.changedTouches[i].clientX;
        y0 = event.changedTouches[i].clientY;
    }
    event.preventDefault();
}, {
    once: false
});

canvas.addEventListener("touchmove", function (event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        x = event.changedTouches[i].clientX;
        y = event.changedTouches[i].clientY;
        drawing(x0, y0, x, y, event.changedTouches.length);
        x0 = x;
        y0 = y;
    };
    event.preventDefault();
}, {
    once: false
});

canvas.addEventListener("touchend", function (event) {
    event.preventDefault();
}, {
    once: false
});
