export default class Geolocation {

  getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (data) {
          const { latitude, longitude } = data.coords;
          return { latitude, longitude };
        },
        function (err) {
          document.body.insertAdjacentHTML('beforeEnd',
            `<div class="modal_mask">
              <div class="modal">
                <div class="modal_msg">${err}</div>
                <button class="close_btn">Close</button>
              </div>
            </div>`,
          );
          const clsModalBtn = document.querySelector('.close_btn');
          clsModalBtn.addEventListener('click', (ev) => ev.target.closest('div.modal_mask').remove());
        },
        { enableHighAccuracy: true }
      );
    }
  }
}