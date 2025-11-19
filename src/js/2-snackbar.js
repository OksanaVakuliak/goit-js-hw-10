import iziToast from 'izitoast';

const form = document.querySelector('.form');

const handleSubmit = event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.success({
        title: '✅ Fulfilled',
        titleColor: '#fff',
        message: `promise in ${delay}ms`,
        messageColor: '#fff',
        iconUrl: './img/circle.svg',
        backgroundColor: '#59a10d',
        position: 'topRight',
        class: 'custom-toast',
      });
    })
    .catch(() => {
      iziToast.error({
        title: '❌ Rejected',
        titleColor: '#fff',
        message: `promise in ${delay}ms`,
        messageColor: '#fff',
        iconUrl: './img/octagon.svg',
        backgroundColor: '#ef4040',
        position: 'topRight',
        class: 'custom-toast',
      });
    });
};

form.addEventListener('submit', handleSubmit);
