export default class GeoLocator {
  constructor() {
    this.container = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
    this.text = this.container.querySelector('[data-id="text"]');
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  init() {
    this.checkBinding();

    document.addEventListener('click', evt => {
      if (evt.target.dataset.id === 'form-submit') {
        evt.preventDefault();
        if (this.text.value === '') {
          this.text.style.borderColor = 'red';
          console.log('empty');
        } else if (navigator.geolocation) {
          const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          };

          const success = (position) => {
            const { latitude, longitude } = position.coords;
            this.addMessage(this.text.value, latitude, longitude);
          };

          const error = (err) => {
            this.openModal();
            console.warn(`ERROR(${err.code}): ${err.message}`);
          };

          navigator.geolocation.getCurrentPosition(success, error, options);
        }
      }
    });
  }

  openModal() {
    const div = document.createElement('div');
    div.classList.add('modal');
    div.innerHTML = '<p>Введите координаты вручную <input type="text" data-id="coordsInput"><button data-id="coordsSubmit">ОК</button>';
    this.container.appendChild(div);
  }

  addMessage(text, latitude, longitude) {
    const div = document.createElement('div');
    div.classList.add('text');
    div.innerHTML = `${text}, ${latitude}, ${longitude}`;
    this.container.prepend(div);
  }
}
