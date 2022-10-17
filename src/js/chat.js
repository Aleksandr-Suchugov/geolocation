/* eslint-disable class-methods-use-this */
export default class Chat {
  addMessage(message, location) {
    const msgContainerEl = document.createElement('div');
    msgContainerEl.className = 'msg__item';
    const newMsg = document.createElement('div');
    newMsg.className = `chat__message`;
    msgContainerEl.insertAdjacentElement('afterbegin', newMsg);
    const msgTimeStampEl = document.createElement('div');
    msgTimeStampEl.textContent = this.messageTimeStamp();
    const msgContentEl = document.createElement('div');
    msgContentEl.className = 'chat__content';
    msgContentEl.textContent = message;
    const coordsEl = document.createElement('div');
    coordsEl.className = 'coords';
    coordsEl.textContent = `[ ${location.latitude.toFixed(5)} : ${location.longitude.toFixed(5)} ]`
    newMsg.insertAdjacentElement('beforeend', msgTimeStampEl);
    newMsg.insertAdjacentElement('afterbegin', msgContentEl);
    msgContainerEl.insertAdjacentElement('beforeend', coordsEl);
    return msgContainerEl;
  }

  messageTimeStamp() {
    const date = new Date();
    const formatterHours = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const formatterMonths = new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return ` ${formatterHours.format(date)} ${formatterMonths.format(date)}`;
  }

  recordTimer(command) {
    if (command === 'start') {
      const timerEl = document.querySelector('.timer__record');
      let seconds = 0;
      let minutes = 0;
      setInterval(() => {
        seconds += 1;
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        secondsText = seconds < 10 ? `0${seconds}` : seconds;
        minutesText = minutes < 10 ? `0${minutes}` : minutes;
        timerEl.textContent = `${minutesText}:${secondsText}`;
      }, 1000);
    } else {
      clearInterval();
      timerEl.textContent = '00:00';
    }
  }

  btnsToggle(mediaBtns, actionBtns) {
    mediaBtns.classList.toggle('hidden');
    actionBtns.classList.toggle('hidden');
  }

}
