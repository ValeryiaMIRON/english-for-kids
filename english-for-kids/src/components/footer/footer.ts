import './footer.scss';
import { BaseComponent } from '../base-component';

export class Footer extends BaseComponent {
    constructor() {
        super('div', ['footer-container']);
        this.render();
    }

    render(): void {
        this.element.innerHTML = Footer.html();
    }

    static html(): string {
        return `
      <div class="footer">
      <a class="github" href="https://github.com/ValeryiaMIRON" target="_blank" rel="noopener noreferrer">ValeryiaMIRON</a>
      <a class="rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
        <span class="rss-year">'21</span>
      </a>
      </div>

           `;
    }
}
