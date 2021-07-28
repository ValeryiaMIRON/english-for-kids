import { BtnPlayGame } from '../../components/btnPlayGame/btnPlayGame';
import { playAudio } from '../../helpers/playAudio';
import { CardType } from '../../types/types';
import { Categories } from '../categories/categories';
import { Stars } from '../../components/stars/stars';

function shuffle(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
}
const array = [0, 1, 2, 3, 4, 5, 6, 7];
const sortArray = shuffle(array);
export class GameModule extends Categories {
    private currentRound = 0;
    private btnPlayGame: BtnPlayGame;
    private _roundsArray: number[] = [];
    private stars: Stars;
    constructor(cardArray: CardType[] = []) {
        super(cardArray);
        this.btnPlayGame = new BtnPlayGame(this.nextRound, this.event);
        this.stars = new Stars();
    }

    static init(): void {}

    static className(): void {}

    static startGame(): void {}

    nextRound = (): void => {
        playAudio(`${this.card[sortArray[this.currentRound]].audioSrc}`);
    };

    static nextRoundClick(): void {
        if (sortArray.length !== 0) {
            sortArray.shift();
        }
    }

    get round(): number {
        return this.currentRound;
    }

    render(): void {
        const container = document.createElement('div');
        container.classList.add('card-container');

        const wrapperStars = document.createElement('div');
        wrapperStars.classList.add('wrapper-stars');

        this.card.forEach((card) => {
            container.append(this.stars.element, card.element, this.btnPlayGame.element);
        });

        this.element.innerHTML = '';
        // если включен Play очищает карточки и оставляет только фото
        this.element.append(container);
        const cardAll = this.element.querySelectorAll('.word-card');
        cardAll.forEach((element) => {
            element.querySelector('.card-header')?.classList.add('hidden');
            element.querySelector('.rotate')?.classList.add('hidden');
            element.querySelector('.front')?.classList.add('card-cover');
        });
    }

    event = (): void => {
        this.element.addEventListener('click', (e) => {
            // событие на кнопке
            const target = e.target as HTMLElement;
            if (target.closest('.word-card')?.id) {
                // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
                const idWord = target.closest('.word-card')!.id;

                const index = this.card.findIndex((card) => card.isSameWord(idWord));
                if (index === sortArray[this.currentRound]) {
                    // затемняет карту
                    target.closest('.word-card')?.classList.add('inactive');
                    // добавляю div со звездочками пустой
                    const containerStars = document.querySelector('.stars');
                    const newStar = document.createElement('div');
                    newStar.classList.add('imgStarFull');
                    // добавления дива со звездочкой пустой
                    document.querySelector('.wrapper-stars')?.insertBefore(newStar, containerStars);
                    playAudio(`audio/correct.mp3`); // звук верный добавление звезды
                    GameModule.nextRoundClick();

                    if (sortArray.length === 0) {
                        const statistics = document.querySelector('.wrapper-stars');

                        if (statistics?.childElementCount === 9) {
                            // добавляем колобка WIN и проверяем на кол-во звезд в div

                            setTimeout(() => {
                                document.querySelector('body')?.classList.add('successImg');
                                const body = document.querySelector('body');
                                if (body) {
                                    body.innerHTML = 'WIN!';
                                }
                                playAudio(`audio/success.mp3`);

                                // удаление элементов при win
                                document.querySelector('.wrapper')?.remove();
                                document.querySelector('.footer-container')?.remove();
                                document.querySelector('.switch-wrapper')?.remove();
                                document.querySelector('.wrapper-burger')?.remove();
                            }, 1000);
                            setTimeout(() => {
                                window.location.href = './index.html';
                            }, 3000);
                        } else {
                            // добавляем колобка error
                            document.querySelector('body')?.classList.add('errorImg');
                            const body = document.querySelector('body');
                            if (body) {
                                body.innerHTML = `You have ${
                                    statistics?.getElementsByClassName('imgStarEmpty').length
                                } error!`;
                            }

                            playAudio(`audio/mistake.mp3`);
                            // удаление элементов при win
                            document.querySelector('.wrapper')?.remove();
                            document.querySelector('.footer-container')?.remove();
                            document.querySelector('.switch-wrapper')?.remove();
                            document.querySelector('.wrapper-burger')?.remove();
                            setTimeout(() => {
                                window.location.href = './index.html';
                            }, 3000);
                        }
                    } else {
                        setTimeout(() => {
                            this.nextRound();
                        }, 1000);
                    }
                } else {
                    playAudio(`audio/error.mp3`); // звук добавления звездочки пустой при ошибке
                    // добавляю div со звездочками пустой
                    const containerStars = document.querySelector('.stars');
                    const newStar = document.createElement('div');
                    newStar.classList.add('imgStarEmpty');
                    // добавления дива со звездочкой пустой
                    document.querySelector('.wrapper-stars')?.insertBefore(newStar, containerStars);
                }
            }
        });
    };
}

export { sortArray };
