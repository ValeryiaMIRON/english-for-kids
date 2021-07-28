import './stars.scss';
import { BaseComponent } from '../base-component';

export class Stars extends BaseComponent {
    constructor() {
        super('div', ['wrapper-stars']);
        this.render();
    }

    render(): void {
        this.element.innerHTML = Stars.html();
    }

    static html(): string {
        return `
    <div class="stars"></div>
 
    `;
    }
}
