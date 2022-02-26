export default class Toggler {
  constructor() {
    this.container = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  init() {
    this.checkBinding();

    document.addEventListener('click', evt => {
      if (evt.target.dataset.toggle === 'collapse') {
        evt.preventDefault();
        const button = evt.target;
        const collapsible = document.querySelector(`#${button.getAttribute('aria-controls')}`);
        console.log(collapsible);
        if (collapsible.classList.contains('show')) {
          collapsible.classList.add('collapsing');
          collapsible.classList.remove('collapse');
          collapsible.classList.remove('show');
          setTimeout(() => {
            collapsible.classList.remove('collapsing');
            collapsible.classList.add('collapse');
          }, 350);
        } else {
          collapsible.classList.add('collapsing');
          collapsible.classList.remove('collapse');
          setTimeout(() => {
            collapsible.classList.add('collapse');
            collapsible.classList.add('show');
            collapsible.classList.remove('collapsing');
          }, 350);
        }
      }
    });
  }
}
