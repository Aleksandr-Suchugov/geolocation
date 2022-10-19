/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Chat from './chat';
import MediaMsg from './mediaMsg';
import geolocation from './geolocation';

export default class API {
  constructor() {
    this.chat = new Chat();
    this.media = new MediaMsg();
    this.input = document.querySelector('.chat__input');
    this.msgOptions = document.querySelector('.input__options');
    this.mediaBtns = document.querySelector('.media__btns');
    this.mediaPlayer = document.querySelector('.chat__messages').firstElementChild;
  }

  init() {
    this.msgOptions.addEventListener('click', (ev) => {
      const location = geolocation();
      if (ev.target.classList.contains('chat__input')) {
        this.input.addEventListener('keydown', (ev) => {
          if (ev.keyCode === 13) this.chat.addMessage('text', this.input.value, location);
        });
        this.input.value = '';
      }
      if (ev.target.parentElement.classList.contains('media__btns')) {
        const type = ev.target.dataset;
        this.chat.addMessage(type, type, location);
        this.media.recording(ev.target, this.mediaPlayer);
      }
    });
  }
}
