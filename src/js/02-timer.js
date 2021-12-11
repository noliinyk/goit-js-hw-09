import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const inputEl = document.querySelector(`input#datetime-picker`);
const btnStart = document.querySelector('button[data-start]');
const daysFace = document.querySelector('span[data-days]');
const hoursFace = document.querySelector('span[data-hours]');
const minutesFace = document.querySelector('span[data-minutes]');
const secondsFace = document.querySelector('span[data-seconds]');
const fp = flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (new Date(inputEl.value).getTime() < Date.now()) {
       return alert("Please choose a date in the future");
      }
  },
});

function startTimer() {
    const date = new Date(inputEl.value);
    const selectedDates = date.getTime();
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDates - currentTime;
      const time = convertMs(deltaTime);

      updateClockFace(time);
    }, 1000);

};

function updateClockFace({ days, hours, minutes, seconds }) {
   
  daysFace.textContent = `${days}`;
  hoursFace.textContent = `${hours}`;
  minutesFace.textContent = `${minutes}`;
  secondsFace.textContent = `${seconds}`;
 
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener(`click`, (onStartTime));

function onStartTime() {
  startTimer();
  btnStart.setAttribute(`disabled`, true);
  
}