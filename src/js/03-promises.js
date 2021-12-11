
const refs = {
  firstDelay: document.querySelector("input[name='delay']"),
  delayStep: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
  button: document.querySelector("button"),
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay);
  });
}

const onFormSubmit = e => {
  e.preventDefault();

  const delay = Number(refs.firstDelay.value);
  const step = Number(refs.delayStep.value);
  const amount = Number(refs.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    const newDelay = delay + step * (i - 1);
     console.log({ i, newDelay });
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        alert(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        alert(`Rejected promise ${position} in ${delay}ms`);
      });
  }
};
refs.button.addEventListener('click', onFormSubmit);