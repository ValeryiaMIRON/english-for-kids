import { Wrapper } from './components/wrapper/wrapper';
import { Burger } from './components/burger/burger';
import { Menu } from './components/menu/menu';
import { MainPage } from './modules/mainPage/mainPage';
import { Switch } from './components/switch/switch';
import { store } from './store/store';
import { Footer } from './components/footer/footer';
import { Categories } from './modules/categories/categories';
import { Mode, Module, LoginDto, Endpoints } from './types/types';
import { Stars } from './components/stars/stars';
import { GameModule } from './modules/gameModule/gameModule';
import { ModalWindow } from './components/modalWindow/modalWindow';
import { AdminPage } from './modules/adminPage/adminPage';
import { AdminPageWord } from './modules/adminPageWord/adminPageWord';

export class App {
    private auth: boolean;
    private readonly wrapper: Wrapper;
    private readonly burger: Burger;
    private readonly menu: Menu;
    private readonly mainPage: MainPage;
    private readonly switch: Switch;
    private category: Categories | GameModule;
    private readonly footer: Footer;
    private modalWindow: ModalWindow;
    private adminPageWord: AdminPageWord;
    private adminPage: AdminPage;
    categoryIdx: number;
    private readonly stars: Stars;

    private currentModule: Module;
    constructor(private readonly rootElement: HTMLElement) {
        this.auth = false;
        this.currentModule = Module.MAIN_PAGE;
        this.wrapper = new Wrapper();
        this.burger = new Burger(this.pushBurger);
        this.menu = new Menu(this.setCategory, this.setCurrentModule, this.setCategoryModule, this.pushMainBtnLogin);
        const categoryList = store.category;
        this.category = new Categories();
        this.footer = new Footer();
        this.modalWindow = new ModalWindow(this.pushBtnCancel, this.pushBtnLogin);
        this.adminPageWord = new AdminPageWord(this.pushAdminCategories);
        this.adminPage = new AdminPage(this.pushAdminWords);
        const categoryImages = store.cards.map((_, idx) => {
            return store.cards[idx][0].image;
        });
        this.categoryIdx = 0;
        this.mainPage = new MainPage(
            categoryList,
            categoryImages,
            this.setCategory,
            this.setCurrentModule,
            this.setCategoryModule,
        );
        this.switch = new Switch(this.switchMode, this.pushSwitch);
        this.stars = new Stars();

        this.rootElement.append(
            this.burger.element,
            this.menu.element,
            this.switch.element,
            this.stars.element,
            this.wrapper.element,
            this.footer.element,
            this.modalWindow.element,
            this.adminPage.element,
            this.adminPageWord.element,
        );
        this.wrapper.element.append(this.mainPage.element);
        this.mainPage.render();
        // убираю при загрузке приложения с главной страницы
        this.stars.element.remove();
    }

    //  start event in ADMIN PAGE

    // нажатие на Words
    pushAdminWords = (): void => {
        document.querySelector('.admin-page-wrapper')?.classList.add('admin-page-hidden');
        document.querySelector('.admin-page-words-wrapper')?.classList.remove('hidden-admin-page-words-wrapper');
    };

    // нажатие на Categories
    pushAdminCategories = (): void => {
        document.querySelector('.admin-page-wrapper')?.classList.remove('admin-page-hidden');
        document.querySelector('.admin-page-words-wrapper')?.classList.add('hidden-admin-page-words-wrapper');
    };

    //  end event in ADMIN PAGE

    // нажатие на бургер в burger.ts
    pushBurger = (): void => {
        const menu = document.querySelector('.wrapper-menu');
        const cover = document.querySelector('.cover');
        menu?.classList.toggle('header--nav__active');
        cover?.classList.remove('hidden');
    };

    // нажатие на свич в switch.ts
    pushSwitch = (): void => {
        const menu = document.querySelector('.wrapper-menu');
        const card = document.querySelectorAll('.card');
        const btnLogin = document.querySelector('.button-login');
        btnLogin?.classList.toggle('menu-play');
        menu?.classList.toggle('menu-play');
        card.forEach(function cardSearch(elem) {
            elem.classList.toggle('card--play');
            store.mode = store.mode === Mode.PLAY ? Mode.TRAIN : Mode.PLAY;
        });
    };

    // нажатие на кнопку login в menu.ts
    pushMainBtnLogin = (): void => {
        const popUpForm = this.rootElement.querySelector('.modal-window-form');
        const coverLogin = this.rootElement.querySelector('.cover-login');
        popUpForm?.classList.remove('hidden');
        coverLogin?.classList.remove('hidden');
    };

    // нажатие на кнопку cancel в popUpLogin.ts
    pushBtnCancel = (): void => {
        const popUpForm = this.rootElement.querySelector('.modal-window-form');
        const coverLogin = this.rootElement.querySelector('.cover-login');
        const menu = document.querySelector('.wrapper-menu');
        const cover = document.querySelector('.cover');
        coverLogin?.classList.add('hidden');
        popUpForm?.classList.add('hidden');
        cover?.classList.add('hidden');
        menu?.classList.toggle('header--nav__active');
        // (<HTMLInputElement>document.getElementById('name')).value = '';
        // (<HTMLInputElement>document.getElementById('password')).value = '';
    };

    // нажатие на Login, переход в админпанель
    pushBtnLogin = async (): Promise<void> => {
        const menu = document.querySelector('.wrapper-menu');
        const cover = document.querySelector('.cover');
        const popUpForm = this.rootElement.querySelector('.modal-window-form');
        const coverLogin = this.rootElement.querySelector('.cover-login');
        const valueLogin = document.getElementById('login') as HTMLInputElement;
        const valuePass = document.getElementById('password') as HTMLInputElement;
        const login = valueLogin.value;
        const password = valuePass.value;
        try {
            if (!login || !password) {
                this.auth = false;
                // console.log('Нужно ввести логин и пароль');
                return;
            }
            // var flag = false;
            const auth: LoginDto = await fetch(Endpoints.auth, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ login, password }),
            }).then((res) => res.json());

            if (auth && !auth.auth) {
                // console.log('Пользователь с таким логином/паролем не найден');
                return;
            }
            this.auth = true;

            // console.log('Пользователь залогинен');

            coverLogin?.classList.add('hidden');
            popUpForm?.classList.add('hidden');
            cover?.classList.add('hidden');
            menu?.classList.toggle('header--nav__active');
            document.querySelector('.admin-page-wrapper')?.classList.remove('admin-page-hidden');
        } catch (error) {
            // console.log(error);
        }
    };

    switchMode = (mode: Mode): void => {
        if (this.currentModule === Module.MAIN_PAGE) {
            // проверка на на мод
        }

        if (this.currentModule === Module.CATEGORY_PAGE) {
            const cardAll = this.category.element.querySelectorAll('.word-card');
            // внутри switch добавляем кнопку и меняем карточки
            if (mode === Mode.PLAY) {
                this.setCategoryModule(Mode.PLAY);
                this.setCategory(this.categoryIdx);
                if (this.category instanceof GameModule) {
                    // this.category.nextRound();
                }

                cardAll.forEach((elem) => {
                    elem.querySelector('.card-header')?.classList.add('hidden');
                    elem.querySelector('.rotate')?.classList.add('hidden');
                    elem.querySelector('.front')?.classList.add('card-cover');
                });
            } else if (mode === Mode.TRAIN) {
                this.setCategoryModule(Mode.TRAIN);
                // создаем и категорию и устанавливаем категорию равную this.categoryIdx
                this.setCategory(this.categoryIdx);
                // убираем класс "круглой" кнопки
                this.stars.element.remove();
                cardAll.forEach((elem) => {
                    elem.querySelector('.card-header')?.classList.remove('hidden');
                    elem.querySelector('.rotate')?.classList.remove('hidden');
                    elem.querySelector('.front')?.classList.remove('card-cover');
                });

                // удаляем из категорий кнопку
                document.querySelector('.btn-container')?.remove();
                // удаляем из категорий звездочки
                document.querySelector('.wrapper-stars')?.remove();
            }
        }
    };

    setCategoryModule = (mode: Mode): void => {
        if (mode === Mode.PLAY) {
            this.category = new GameModule();
        } else {
            this.category = new Categories();
        }
    };

    setCurrentModule = (module: Module): void => {
        this.currentModule = module;
    };

    setCategory = (idx: number): void => {
        this.categoryIdx = idx;
        if (idx === -1) {
            this.wrapper.element.innerHTML = '';
            this.wrapper.element.append(this.mainPage.element);
            document.querySelector('.wrapper-menu')?.classList.remove('header--nav__active');
            document.querySelector('.cover')?.classList.add('hidden');
            // this.btnPlayGame.element.remove();
            this.stars.element.remove();
        } else {
            this.category.card = store.cards[idx];
            this.wrapper.element.innerHTML = '';
            this.wrapper.element.append(this.category.element);
        }
    };
}
