import './mainPage.scss';
import { BaseComponent } from '../../components/base-component';
import { CategoryType, Module, Mode } from '../../types/types';
import { getMode } from '../../store/store';

type TCategory = { name: string; image: string };

export class MainPage extends BaseComponent {
    category: TCategory[];
    setCategory: (idx: number) => void;
    setCurrentModule: (module: Module) => void;
    setCategoryModule: (mode: Mode) => void;
    constructor(
        categoryArray: CategoryType,
        categoryImages: string[],
        setCategory: (idx: number) => void,
        setCurrentModule: (module: Module) => void,
        setCategoryModule: (mode: Mode) => void,
    ) {
        super('div', ['container']);
        this.setCategory = setCategory;
        this.setCurrentModule = setCurrentModule;
        this.setCategoryModule = setCategoryModule;
        this.category = categoryArray.map((cat: string, index: number) => {
            return {
                name: cat,
                image: categoryImages[index],
            };
        });

        this.events();
        this.render();
    }

    static HTML(category: TCategory, index: number): string {
        return ` <a class="card" id ="category-${index}" href="#">
    <img src="assets/${category.image}" alt="${category.name})">${category.name}</a>`;
    }

    setNewCategory(cats: TCategory[]): void {
        this.category = cats;
    }

    render(): void {
        this.element.innerHTML = '';
        this.category.forEach((cat, idx) => {
            this.element.innerHTML += MainPage.HTML(cat, idx);
        });
    }

    events = (): void => {
        this.element.addEventListener('click', (e) => {
            // убирает класс activeNow со всех эл-тов nav

            const wrapperMenu = document.querySelector('.wrapper-menu');

            wrapperMenu?.querySelectorAll('.menu > a').forEach((element) => {
                element.classList.remove('activeNow');
            });

            const target = e.target as Element;
            if (target.closest('.card')) {
                // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
                const id: number = +target.closest('.card')!.id.replace('category-', '');
                this.setCurrentModule(Module.CATEGORY_PAGE);
                const mode = getMode();
                if (mode === Mode.TRAIN) {
                    this.setCategoryModule(Mode.TRAIN);
                } else {
                    this.setCategoryModule(Mode.PLAY);
                }

                this.setCategory(id);
                // навешиваем activeNow на ссылки меню
                wrapperMenu?.querySelector(`#category-${id}`)?.classList.toggle('activeNow');
            }
        });
    };
}
