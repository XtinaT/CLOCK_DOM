"use strict";
var form = document.forms.form;
var button = form.elements.button;
button.addEventListener("click", validateForm, false);

function validateForm(e) {
  e = e || window.event;
  try {
    var form = document.forms.form;
    var diametrField = form.elements.diam;
    var diametr = parseInt(diametrField.value);

    if (isNaN(diametr)) {
      var sp = form.getElementsByTagName("span");
      sp[0].style.color = "red";
      sp[0].textContent = "Введите число от 200 до 800";
      e.preventDefault();
    } else if (diametr < 200 || diametr > 800) {
      var sp = form.getElementsByTagName("span");
      sp[0].style.color = "red";
      sp[0].textContent = "Диаметр часов должен быть от 200 до 800 пикселей";
      e.preventDefault();
    } else {
      var sp = form.getElementsByTagName("span");
      button.removeEventListener("click", validateForm, false);
      sp[0].textContent = null;
      buildWatch(diametr);
    }
  } catch (ex) {
    alert("Что-то пошло не так!");
    e.preventDefault();
  }
}

function buildWatch(diametr) {
  var body = document.getElementsByTagName('body');

  var reducedRadius = diametr / 2.5;
  var numbers = 12; //количесвто делений на циферблате
  var unit = 5; //количесвто делений между делениями numbers
  var standartHoursAngle = 360 / numbers; //угол между двумя делениями
  var standartMinutesAngle = 360 / (numbers * unit);
  var standartSecondsAngle = 360 / (numbers * unit);

  form.style.display = "none";
  var clock = document.createElement("div");
  body[0].appendChild(clock);
  clock.style.position = "relative";
  clock.style.backgroundColor = '#fccb66';
  clock.style.borderRadius = "50%";
  clock.style.width = diametr + "px";
  clock.style.height = diametr + "px";
  clock.style.display = "block";
  var clockCenterX = clock.offsetLeft + clock.offsetWidth / 2;
  var clockCenterY = clock.offsetTop + clock.offsetHeight / 2;


  var timer = document.createElement("div");
  timer.style.position = "absolute";
  timer.style.backgroundColor = '#fccb66';
  timer.style.width = diametr / 2 + "px";
  timer.style.height = diametr / 5 + "px";
  timer.style.left = diametr / 4 + "px";
  timer.style.top = diametr / 4 + "px";
  timer.style.display = "block";
  timer.style.textAlign = "center";
  timer.style.fontSize = diametr / 10 + "px";
  clock.appendChild(timer);


  for (var i = 0; i < numbers; i++) {
    var number = document.createElement("div");
    number.textContent = i + 1;
    number.style.borderRadius = "50%";
    number.style.position = "absolute";
    number.style.width = diametr / 9 + "px";
    number.style.height = diametr / 9 + "px";
    number.style.textAlign = "center";
    number.style.backgroundColor = "#46b483";
    number.style.fontSize = diametr / 12 + "px";
    clock.appendChild(number);
    var angle = ((standartHoursAngle * i + standartHoursAngle) / 180) * Math.PI;
    var numberCenterX = clockCenterX + reducedRadius * Math.sin(angle);
    var numberCenterY = clockCenterY - reducedRadius * Math.cos(angle);
    number.style.left = Math.round(numberCenterX - number.offsetWidth / 2) + "px";
    number.style.top = Math.round(numberCenterY - number.offsetHeight / 2) + "px";
  }

  var hourHand = document.createElement("div");
  hourHand.setAttribute('id', 'HH');
  hourHand.style.position = "absolute";
  var width = diametr / 37;
  var height = diametr / 4;
  hourHand.style.width = width + "px";
  hourHand.style.height = height + "px";
  hourHand.style.left = clockCenterX - width / 2 + "px";
  hourHand.style.bottom = clockCenterY + "px";
  hourHand.style.transformOrigin = '50% 95%';
  hourHand.style.backgroundColor = "black";
  hourHand.style.borderRadius = "5px";
  clock.appendChild(hourHand);

  var minuteHand = document.createElement("div");
  minuteHand.setAttribute('id', 'MH');
  minuteHand.style.position = "absolute";
  var width = diametr / 60;
  var height = diametr / 2.5;
  minuteHand.style.width = width + "px";
  minuteHand.style.height = height + "px";
  minuteHand.style.left = clockCenterX - width / 2 + "px";
  minuteHand.style.bottom = clockCenterY + "px";
  minuteHand.style.transformOrigin = '50% 95%';
  minuteHand.style.backgroundColor = "black";
  minuteHand.style.borderRadius = "5px";
  clock.appendChild(minuteHand);

  var secondHand = document.createElement("div");
  secondHand.setAttribute('id', 'SH');
  secondHand.style.position = "absolute";
  var width = diametr / 130;
  var height = diametr / 2.2;
  secondHand.style.width = width + "px";
  secondHand.style.height = height + "px";
  secondHand.style.left = clockCenterX - width / 2 + "px";
  secondHand.style.bottom = clockCenterY + "px";
  secondHand.style.transformOrigin = '50% 95%';
  secondHand.style.backgroundColor = "black";
  secondHand.style.borderRadius = "5px";
  clock.appendChild(secondHand);

  function updateTime() {
    var currTime = new Date();
    timer.textContent = formatTime(currTime);
    function formatTime(dt) {
      var hours = dt.getHours();
      var minutes = dt.getMinutes();
      var seconds = dt.getSeconds();
      var time = str0l(hours, 2) + ":" + str0l(minutes, 2) + ":" + str0l(seconds, 2);
      console.log(time);
      return time;
    }
    function str0l(val, len) {
      var strVal = val.toString();
      while (strVal.length < len) strVal = "0" + strVal;
      return strVal;
    }
  }
  updateTime();

  function setHands() {
    var currTime = new Date();
    var hours = currTime.getHours();
    var minutes = currTime.getMinutes();
    var seconds = currTime.getSeconds();
    var hourHand = document.getElementById('HH');
    var minuteHand = document.getElementById('MH');
    var secondHand = document.getElementById('SH');
    var ratio = standartHoursAngle / 60; //угол поворота часовой стрелки за 1 минуту
    var hoursAngle = standartHoursAngle * hours + ratio * minutes;
    hourHand.style.transform = `rotate(${hoursAngle}deg)`;

    var minutesAngle = standartMinutesAngle * minutes;
    minuteHand.style.transform = `rotate(${minutesAngle}deg)`;

    var secondsAngle = standartSecondsAngle * seconds;
    secondHand.style.transform = `rotate(${secondsAngle}deg)`;
  }


  setHands();
  setInterval(() => {
    updateTime();
    setHands();
  }, 1000);
}