import './adminPage.scss';
import { BaseComponent } from '../../components/base-component';
import { CategoryAdmin } from '../../components/categoryAdmin/categoryAdmin';

export class AdminPage extends BaseComponent {
    private categoryAdmin: CategoryAdmin;
    pushAdminWords: () => void;
    constructor(pushAdminWords: () => void) {
        super('div');
        this.categoryAdmin = new CategoryAdmin();
        this.pushAdminWords = pushAdminWords;
        this.render();
    }

    render(): void {
        this.element.innerHTML = AdminPage.html();
        this.element.querySelector('.case')?.append(this.categoryAdmin.element);
        this.event();
    }

    static html(): string {
        return `
        <div class="admin-page-wrapper admin-page-hidden">
        <div class="admin-page-header">
        <div class="admin-page-wrapper-link active-link"><a class="admin-page-link-item">Categories</a></div>
        <div class="admin-page-wrapper-link admin-page-link-wrapper-words"> <a class="admin-page-link-item">Words</a></div>
        <div class="admin-page-wrapper-link admin-page-link-categories-logout"><a class="admin-page-link-item">Log out</a></div>
        </div>
        <div class="case"></div>
        </div>
          `;
    }

    event(): void {
        this.element.querySelector('.admin-page-link-wrapper-words')?.addEventListener('click', () => {
            this.pushAdminWords();
        });

        this.element.querySelector('.admin-page-link-categories-logout')?.addEventListener('click', () => {
            this.element.querySelector('.admin-page-wrapper')?.classList.add('admin-page-hidden');
        });
    }
}
