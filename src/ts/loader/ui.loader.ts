import { ExtJsObject, $ } from '../tools/extjs';

export default class loaderUI {
    private loader: ExtJsObject;
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
    }

    public destroy() {
        this.loader.remove();
    }
}
