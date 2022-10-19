/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Chat from './chat';
import MediaMsg from './mediaMsg';

export default class API {
  constructor() {
    this.chat = new Chat();
    this.media = new MediaMsg();
    this.input = document.querySelector('.chat__input');
    this.msgOptions = document.querySelector('.input__options');
    this.mediaBtns = document.querySelector('.media__btns');
    this.mediaPlayer = null;
  }

  init() {
    this.msgOptions.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('chat__input')) {
        this.input.addEventListener('keydown', (e) => {
          if (e.keyCode === 13) {
            this.chat.addMessage('text', this.input.value);
            this.input.value = '';
          }
        });
      }
      if (ev.target.parentElement.classList.contains('media__btns')) {
        const type = ev.target.dataset.type;
        this.chat.addMessage(type, type);
        this.mediaPlayer = document.querySelector('.chat__messages').firstElementChild.querySelector(type);
        this.media.recording(ev.target, this.mediaPlayer);
      }
    });
  }
}
