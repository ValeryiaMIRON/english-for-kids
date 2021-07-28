import './adminPageWord.scss';
import { BaseComponent } from '../../components/base-component';

export class AdminPageWord extends BaseComponent {
    pushAdminCategories: () => void;
    constructor(pushAdminCategories: () => void) {
        super('div');
        this.pushAdminCategories = pushAdminCategories;
        this.render();
    }

    render(): void {
        this.element.innerHTML = AdminPageWord.html();
        this.event();
    }

    static html(): string {
        return `
        <div class="admin-page-words-wrapper hidden-admin-page-words-wrapper">
          <div class="admin-page-header">
            <div class="admin-page-wrapper-link admin-page-link-wrapper-categories"><a class="admin-page-link-item">Categories</a></div>
            <div class="admin-page-wrapper-link active-link"> <a class="admin-page-link-item">Words</a></div>
            <div class="admin-page-wrapper-link admin-page-link-words-logout"><a class="admin-page-link-item">Log out</a></div>
          </div>
          <div class="case-words"></div>
        
        </div>
           `;
    }

    event(): void {
        this.element.querySelector('.admin-page-link-wrapper-categories')?.addEventListener('click', () => {
            this.pushAdminCategories();
        });

        this.element.querySelector('.admin-page-link-words-logout')?.addEventListener('click', () => {
            this.element.querySelector('.admin-page-words-wrapper')?.classList.add('hidden-admin-page-words-wrapper');
        });
    }
}
