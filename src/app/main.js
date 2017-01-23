require('./main.css');
import $ from 'jquery';
import Hammer from 'hammerjs';
import ko from 'knockout';
import * as Materialize from '../third-party/materialize/js/materialize';
import * as core from './core/core';
import app from './features/app.component';

ko.components.register(app.name, app.prop);

ko.applyBindings();
