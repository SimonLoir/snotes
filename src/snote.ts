import './style/snote.scss';
import { $ } from './typescript/extjs';
import docview from './typescript/docview';
import toggleStartScreen from './typescript/startscreen';
import env from './typescript/env';
import save from './typescript/save';
$(document).ready(async () => {
    setTimeout(() => {
        toggleStartScreen();
        if (env() == false) {
            $('#ss-message').text(`SNotes is not available right now`);
        }
    }, 200);
    let d = new docview();
});
save;
