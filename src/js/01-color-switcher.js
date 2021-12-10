const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
  };
  let timerId = null;
  
  refs.stopBtn.disabled = true;
  refs.startBtn.addEventListener("click", onStartBtn);
  refs.stopBtn.addEventListener("click", onStopBtn);
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  function onStartBtn() {
      timerId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
  
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = false;
  }
  
  function onStopBtn() {
      clearInterval(timerId);
  
      refs.startBtn.disabled = false;
      refs.stopBtn.disabled = true;
     
  }
