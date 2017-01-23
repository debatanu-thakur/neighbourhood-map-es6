import template from './app.template.html';
import viewModel from './app.view';

const component = {
    name: 'main-app',
    prop: {
        template,
        viewModel
    }
};
export default component;