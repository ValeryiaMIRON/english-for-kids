import './modalWindow.scss';
import { BaseComponent } from '../base-component';

export class ModalWindow extends BaseComponent {
    pushBtnCancel: () => void;
    pushBtnLogin: () => Promise<void>;
    constructor(pushBtnCancel: () => void, pushBtnLogin: () => Promise<void>) {
        super('div', ['modal-window-wrapper']);
        this.pushBtnCancel = pushBtnCancel;
        this.pushBtnLogin = pushBtnLogin;
        this.render();
    }

    render(): void {
        this.element.innerHTML = ModalWindow.html();
        this.event();
    }

    static html(): string {
        return `
        <div class="modal-window-form hidden">
          <form action="">
          <div class="modal-window-item">Login</div>
          <label class="modal-window-label" for="login">login</label>
          <input class="modal-window-input" type="text" id="login" placeholder="login" required minlength="1">
          <br>
          <label class="modal-window-label" for="password">password</label>
          <input class="modal-window-input" type="password" id="password"placeholder="password" required>
          <br>
          <div class="modal-window-wrapper-btn">
          <button class="modal-window-btn-cancel" type="reset">Cancel</button>
          <button class="modal-window-btn-login" type="submit">Login</button>
          </div>     
          </form>
        </div>
        <div class = "cover-login hidden"></div>
        `;
    }

    event(): void {
        this.element.querySelector('.modal-window-btn-cancel')?.addEventListener('click', () => {
            this.pushBtnCancel();
        });

        this.element.querySelector('.modal-window-btn-login')?.addEventListener('click', (event) => {
            event.preventDefault();
            this.pushBtnLogin();
        });
    }
}
