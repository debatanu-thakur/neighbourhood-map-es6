require('./main.css');
import Hammer from 'hammerjs';
import ko from 'knockout';
import * as Materialize from '../third-party/materialize/js/materialize';
import core from './core/core';
import app from './features/app.component';
import myApp from './features/app.services';

//TODO: Attach core components with the app
myApp.core = core;
ko.components.register(app.name, app.prop);
ko.applyBindings();

$.getScript('https://www.google.com/jsapi', function()
{
    google.load('maps', '3', {
        other_params: `key=AIzaSyC2Xryh23SOWVxOqNWKPDANkB9SQpPGe00&libraries=places`,
        callback: function()
        {
            const element = document.getElementById('map');
            console.log(myApp);
            myApp.INIT(element, (location) => {
                myApp.core.api.GetAPIInfo(location).then((resp) => {
                    console.log('resp', resp);
                });
            });
        }
    });
});
