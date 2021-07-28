import './style.scss';
import { App } from './app';

window.onload = () => {
    const appElement = document.querySelector('body');

    if (!appElement) throw Error('Api root element not found');
    return new App(appElement);
};
