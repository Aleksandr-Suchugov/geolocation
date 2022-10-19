export default function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const location = { latitude, longitude };
        location.latitude = data.coords.latitude.toFixed(5);
        location.longitude = data.coords.longitude.toFixed(5);
        return location;
      },
      (err) => {
        document.body.insertAdjacentHTML(
          'beforeEnd',
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
      { enableHighAccuracy: true },
    );
  }
}
