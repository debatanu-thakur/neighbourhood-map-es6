require('./main.css');
import Hammer from 'hammerjs';
import ko from 'knockout';
import * as Materialize from '../third-party/materialize/js/materialize';
import * as core from './core/core';
import app from './features/app.component';

//TODO: Attach core components with the app
ko.components.register(app.name, app.prop);

ko.applyBindings();
