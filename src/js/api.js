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
  }

  init() {
    this.msgOptions.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('chat__input')) {
        this.input.addEventListener('keydown', (ev) => {
          if (ev.keyCode === 13) this.chat.addMessage(this.input.value, geolocation());
        });
        this.input.value = '';
      }
      if (ev.target.parentElement.classList.contains('media__btns')) {
        const type = ev.target.dataset;
        this.chat.addMessage(type, 'media', geolocation());
        const mediaPlayer = document.querySelector(`.${type}`);
        this.media.recording(ev.target, mediaPlayer);
      }
    });
  }
}
