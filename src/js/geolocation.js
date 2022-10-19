export default function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        // console.log(data.coords);
        const { latitude } = data.coords;
        const { longitude } = data.coords;
        document.querySelector('.coords').textContent = `lat.:${latitude}, long.:${longitude}.`;
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
