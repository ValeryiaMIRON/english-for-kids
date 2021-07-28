import './categoryAdmin.scss';
import { BaseComponent } from '../base-component';

export class CategoryAdmin extends BaseComponent {
    constructor() {
        super('div', ['wrapper-category-admin']);

        this.render();
    }

    render(): void {
        this.element.innerHTML = CategoryAdmin.html();
    }

    static html(): string {
        return `
        <div class = "name-category">Clothes</div>
        <button class="btn-admin-update">update</button>
        <button class="btn-admin-add-word">add word</button>
        `;
    }
}
