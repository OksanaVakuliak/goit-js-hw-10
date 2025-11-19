import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const refs = {
  inputPicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),

  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timerId = null;
refs.startBtn.disabled = true;

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
};

flatpickr(refs.inputPicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: 'Please choose a date in the future',
        position: 'topRight',
        messageColor: '#fff',
        iconUrl: '../img/octagon.svg',
        iconColor: '#fff',
        backgroundColor: '#ef4040',
        class: 'custom-toast',
      });
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
});

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.inputPicker.disabled = true;

  timerId = setInterval(() => {
    const delta = userSelectedDate - Date.now();
    if (delta <= 0) {
      clearInterval(timerId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      refs.inputPicker.disabled = false;
      refs.startBtn.disabled = true;

      return;
    }

    const time = convertMs(delta);
    updateTimerDisplay(time);
  }, 1000);
});
