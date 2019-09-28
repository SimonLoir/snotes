import { ExtJsObject, $ } from '../tools/extjs';

export default class loaderUI {
    private loader: ExtJsObject;
    private message_container: ExtJsObject;
    constructor() {
        this.loader = $('body')
            .child('div')
            .addClass('loader');
        const loader = this.loader.child('div').addClass('gooey');
        loader.child('span').addClass('dot');
        const dots = loader.child('div').addClass('dots');
        dots.child('span');
        dots.child('span');
        dots.child('span');
        this.message_container = this.loader.child('span').cssObj({
            position: 'absolute',
            left: '50%',
            bottom: '25px',
            transform: 'translateX(-50%)',
        });
    }

    public set text(text: string) {
        this.message_container.text(text);
    }

    public destroy() {
        this.loader.remove();
    }
}
