import './btnPlayGame.scss';
import { BaseComponent } from '../base-component';

export class BtnPlayGame extends BaseComponent {
    nextRound: () => void;
    event: () => void;
    constructor(nextRound: () => void, event: () => void) {
        super('div', ['btn-container']);
        this.nextRound = nextRound;
        this.event = event;
        this.render();
    }

    render(): void {
        this.element.innerHTML = BtnPlayGame.html();
        this.eventStartGame();
    }

    static html(): string {
        return ` 
    <button class="btn">Start game</button>
    `;
    }

    // события при клике на Start Game находимся в категориях
    eventStartGame(): void {
        this.element.querySelector('.btn')?.addEventListener('click', () => {
            if (this.element.querySelector('.repeat')) {
                this.nextRound();
            } else {
                this.element.querySelector('.btn')?.classList.add('repeat');
                this.nextRound();
                this.event();
            }
        });
    }
}
