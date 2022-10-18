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
    this.init();
  }

  init() {
    this.msgOptions.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('chat__input')) {
        this.input.addEventListener('enter', () => this.chat.addMessage(this.input.value, geolocation()));
        this.input.value = '';
      }
      if (ev.target.parentElement.classList.contains('media__btns')) {
        this.media.recording(geolocation());
      }
    });
  }
}
