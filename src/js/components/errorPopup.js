let instance = null;
// Singleton
export class ErrorPopup {

    static instance;

    constructor() {

        if(instance){
            return instance;
          }

        this.overlay = document.querySelector('.overlay');
        this.popup = document.querySelector('.popup');
        this.popupContent = document.querySelector('.popup-content');
        this.popupCloseBtn = document.querySelector('.close-popup-btn');
        this.init();

        this.instance = this;

    }

    init() {
        this.popup.addEventListener('click', this.clickHandler.bind(this));
    }

    clickHandler(e) {
        if (e.target === this.popupCloseBtn) {
            this.closePopup();
        }
    }

    showErrorPopup(msg) {
        this.overlay.style.display = 'block';
        this.popup.style.display = 'block';
        this.popupContent.textContent = msg;
    }

    closePopup() {
        this.overlay.style.display = 'none';
        this.popup.style.display = 'none';
    }
}