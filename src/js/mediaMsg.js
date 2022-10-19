import Chat from './chat';

export default class MediaMsg {
  constructor() {
    this.chat = new Chat();
    this.stopBtn = document.querySelector('.stop__record');
    this.cancelBtn = document.querySelector('.delete__record');
    this.stream = null;
    this.type = null;
  }

  recording(recordBtn, mediaPlayer) {
    recordBtn.addEventListener('click', async (e) => {
      if (e.target.classList === 'voice__message') {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        this.type = 'audio';
      } else {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.type = 'video';
      }
      this.chat.btnsToggle();

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
        mediaPlayer.src = URL.createObjectURL(blob);
      });

      recorder.start();

      this.stopBtn.addEventListener('click', () => {
        this.chat.recordTimer('stop');
        recorder.stop();
        this.stream.getTracks().forEach((track) => track.stop());
        this.chat.btnsToggle();
      });

      this.cancelBtn.addEventListener('click', () => {
        this.chat.recordTimer('stop');
        recorder.stop();
        chunks = [];
        this.chat.btnsToggle();
      });
    });
  }
}
