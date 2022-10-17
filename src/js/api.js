/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Chat from './chat';
import MediaMsg from './mediaMsg';
import Geolocation from './geolocation';

export default class API {
  constructor() {
    this.chat = new Chat();
    this.media = new MediaMsg();
    this.location = new Geolocation();
    this.input = document.querySelector('.chat__input');
    this.msgOptions = document.querySelector('.input__options');
    this.mediaBtns = document.querySelector('.media__btns');
    this.message;
    this.init();
  }

  init() {
    this.msgOptions.addEventListener('click', (ev) => {
      if (ev.target === this.input) {
        this.message = this.input.value;
        this.input.addEventListener('enter', () => this.chat.addMessage(this.message, this.location.getCoordinates()));
        this.input.value = '';
      }
      if (ev.target.parentElement === this.mediaBtns) {
        this.media.recording(this.location.getCoordinates());
      }
    });
  }

}
