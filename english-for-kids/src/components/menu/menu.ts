import './menu.scss';
import { BaseComponent } from '../base-component';
import { Mode, Module } from '../../types/types';
import { getMode } from '../../store/store';

export class Menu extends BaseComponent {
    pushMainBtnLogin: () => void;
    setCategory!: (idx: number) => void;
    setCurrentModule: (module: Module) => void;
    setCategoryModule: (mode: Mode) => void;
    constructor(
        setCategory: (idx: number) => void,
        setCurrentModule: (module: Module) => void,
        setCategoryModule: (mode: Mode) => void,
        pushMainBtnLogin: () => void,
    ) {
        super('div', ['wrapper-menu']);
        this.setCategory = setCategory;
        this.setCurrentModule = setCurrentModule;
        this.setCategoryModule = setCategoryModule;
        this.pushMainBtnLogin = pushMainBtnLogin;
        this.render();
    }

    render(): void {
        this.element.innerHTML = Menu.html();
        this.event();
    }

    static html(): string {
        return `
     <div class="close-menu-btn">
      <span class="close-menu-btn__closeline"></span>
      <span class="close-menu-btn__closeline"></span>
     </div>
     <nav class="menu">
       <a class="header-item activeNow" data-id=-1 href="#" id="category--1">
       <img src="assets/img/main.png" alt="main">
       Main Page
       </a>
       <a class="header-item" data-id=0 href="#" id="category-0">
       <img src="assets/img/actionA.png" alt="actionA">
       Action (set A)
       </a>
       <a class="header-item" data-id=1 href="#" id="category-1">
       <img src="assets/img/actionB.png" alt="actionB">
       Action (set B)
       </a>
       <a class="header-item" data-id=2 href="#" id="category-2">
       <img src="assets/img/actionC.png" alt="actionC">
       Action (set C)
       </a>
       <a class="header-item" data-id=3 href="#" id="category-3">
       <img src="assets/img/adjective.png" alt="adjective">
       Adjective
       </a>
       <a class="header-item" data-id=4 href="#" id="category-4">
       <img src="assets/img/animalA.png" alt="animalA">
       Animal (set A)
       </a>
       <a class="header-item" data-id=5 href="#" id="category-5">
       <img src="assets/img/animalB.png" alt="animalB">
       Animal (set B)
       </a>
       <a class="header-item" data-id=6 href="#" id="category-6">
       <img src="assets/img/clothes.png" alt="clothes">
       Clothes
       </a>
       <a class="header-item" data-id=7 href="#" id="category-7">
       <img src="assets/img/emotions.png" alt="emotions">
       Emotion
       </a>
     </nav>
     <button class="button-login">Login</button>
     <div class="cover hidden" id="cover"></div>
        `;
    }

    event(): void {
        this.element.querySelector('.menu')?.addEventListener('click', (e) => {
            // убирает класс activeNow со всех эл-тов nav
            this.element.querySelectorAll('.menu > a').forEach((element) => {
                element.classList.remove('activeNow');
            });

            // переключение категорий по айди
            const target = e.target as HTMLElement;
            if (target) {
                const id: number = +target.id.replace('category-', '');
                if (id === -1) {
                    this.setCurrentModule(Module.MAIN_PAGE);
                } else {
                    this.setCurrentModule(Module.CATEGORY_PAGE);
                }
                const mode = getMode();
                if (mode === Mode.TRAIN) {
                    this.setCategoryModule(Mode.TRAIN);
                } else {
                    this.setCategoryModule(Mode.PLAY);
                }
                this.setCategory(id);
            }
            // навешивает класс activeNow
            target.classList.toggle('activeNow');
            this.element.classList.remove('header--nav__active');
            this.element.querySelector('.cover')?.classList.add('hidden');
        });

        this.element.querySelector('.button-login')?.addEventListener('click', () => {
            this.pushMainBtnLogin();
        });

        this.element.querySelector('.close-menu-btn')?.addEventListener('click', () => {
            this.element.classList.toggle('header--nav__active');
            this.element.querySelector('.cover')?.classList.add('hidden');
        });

        this.element.querySelector('.cover')?.addEventListener('click', () => {
            this.element.classList.remove('header--nav__active');
            this.element.querySelector('.cover')?.classList.add('hidden');
        });
    }
}
