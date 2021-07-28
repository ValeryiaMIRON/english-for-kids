import './categories.scss';
import { BaseComponent } from '../../components/base-component';
import { Card } from './ card';
import { CardType } from '../../types/types';

export class Categories extends BaseComponent {
    private _cards: Card[] = [];
    // private readonly stars: Stars;
    constructor(cardArray: CardType[] = []) {
        super('div', ['container-card']);
        this.card = cardArray;
        Categories.className();
    }

    set card(cardArray: CardType[]) {
        this._cards = cardArray.map((card) => new Card(card));
        this.render();
    }

    get card(): Card[] {
        return this._cards;
    }

    static className(): void {}

    render(): void {
        const container = document.createElement('div');
        container.classList.add('card-container');
        this.card.forEach((card) => {
            container.append(card.element);
        });

        this.element.innerHTML = '';
        this.element.append(container);
    }
}
