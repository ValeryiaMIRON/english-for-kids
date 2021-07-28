import './categories.scss';
import { CardType, Mode } from '../../types/types';
import { getMode } from '../../store/store';
import { playAudio } from '../../helpers/playAudio';

const cardState = {
    isRotated: false,
};

export class Card {
    image: string;
    word: string;
    translation: string;
    audioSrc: string;
    element: HTMLElement;
    constructor(card: CardType) {
        this.element = document.createElement('div');
        this.element.classList.add('card-wrapper');
        this.image = card.image;
        this.word = card.word;
        this.translation = card.translation;
        this.audioSrc = card.audioSrc;
        this.render();
    }

    get html(): string {
        return `
        <div class="word-card" id="${this.word}">
              <div class="front" style="background-image: url(assets/${this.image});">
              <div class="card-header">${this.word}</div>
              <div class="rotate"></div>
              </div>
              <div class="back" style="background-image: url(assets/${this.image});">
                <div class="card-header">${this.translation}</div>
              </div>             
            </div>

        `;
    }

    isSameWord(word: string): boolean {
        return this.word === word;
    }

    render(): void {
        this.element.innerHTML = this.html;
        this.events();
    }

    events(): void {
        this.element.addEventListener('click', () => {
            const mode = getMode();
            if (mode === Mode.TRAIN && !cardState.isRotated) {
                playAudio(this.audioSrc);
            } else if (mode === Mode.PLAY) {
                this.element.querySelector('.rotate')?.classList.add('none');
            }
        });
        this.element.querySelector('.rotate')?.addEventListener('click', () => {
            const mode = getMode();
            if (mode === Mode.TRAIN && !cardState.isRotated) {
                this.rotate();
            }
        });

        this.element.addEventListener('mouseleave', () => {
            cardState.isRotated = false;
            this.element.querySelector('.word-card')?.classList.remove('turn-over');
        });
    }

    rotate(): void {
        cardState.isRotated = true;
        this.element.querySelector('.word-card')?.classList.add('turn-over');
    }
}
