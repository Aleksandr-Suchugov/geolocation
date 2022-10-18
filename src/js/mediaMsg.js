import Chat from './chat';

export default class MediaMsg {
  constructor(recordButton, mediaPlayer) {
    this.chat = new Chat();
    this.recordBtn = recordButton;
    this.player = mediaPlayer;
    this.stopBtn = document.querySelector('.stop__record');
    this.cancelBtn = document.querySelector('.delete__record');
    this.mediaBtns = document.querySelector('.media__btns');
    this.controlBtns = document.querySelector('.record__btns');
    this.stream = null;
  }

  recording(location) {
    this.recordBtn.addEventListener('click', async (e) => {
      let type;
      if (e.target.classList === 'voice__message') {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        type = 'audio';
      } else {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        type = 'video';
      }
      this.chat.btnsToggle(this.mediaBtns, this.controlBtns);

      const recorder = new MediaRecorder(this.stream);
      let chunks = [];

      recorder.addEventListener('start', () => {
        this.chat.recordTimer('start');
      });

      recorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks);
        this.player.src = URL.createObjectURL(blob);
      });

      recorder.start();

      this.stopBtn.addEventListener('click', () => {
        this.chat.recordTimer('stop');
        recorder.stop();
        const mediaMsg = this.stream.getTracks().forEach((track) => track.stop());
        this.chat.btnsToggle(this.mediaBtns, this.controlBtns);
        this.chat.addMediaMsg(type);
        
      });

      this.cancelBtn.addEventListener('click', () => {
        this.chat.recordTimer('stop');
        recorder.stop();
        chunks = [];
        this.chat.btnsToggle(this.mediaBtns, this.controlBtns);
      });
    });
  }
}
