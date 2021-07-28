import './burger.scss';
import { BaseComponent } from '../base-component';

export class Burger extends BaseComponent {
    pushBurger: () => void;
    constructor(pushBurger: () => void) {
        super('div', ['wrapper-burger']);
        this.pushBurger = pushBurger;
        this.init();
    }

    init(): void {
        this.element.innerHTML = Burger.html();
        this.event();
    }

    static html(): string {
        return `
        <span class="burger-line burger-linefirst"></span>
        <span class="burger-line burger-linesecond"></span>
        <span class="burger-line burger-line__third"></span>
        `;
    }

    event(): void {
        this.element.addEventListener('click', () => {
            this.pushBurger();
        });
    }
}
