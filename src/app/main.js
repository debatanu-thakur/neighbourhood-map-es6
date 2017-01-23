require('./main.css');

import ko from 'knockout';
import app from './features/app.component';

const components = [app];

components.forEach((component) => {
	ko.components.register(component.name, component.prop);
});

ko.applyBindings();
