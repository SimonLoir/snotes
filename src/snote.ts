import './style/snote.scss';
import { $ } from './typescript/extjs';
import docview from './typescript/docview';
import toggleStartScreen from './typescript/startscreen';
import env from './typescript/env';
$(document).ready(async () => {
    setTimeout(() => {
        toggleStartScreen();
        if (env() == false) {
            //toggleStartScreen();
            $('#ss-message').text(`SNotes is not available right now`);
        }
    }, 2);
    let d = new docview();
});
