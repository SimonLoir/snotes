import canvas from '../../../lib/smath/src/canvas';
import Parser, { MathObject } from '../../../lib/smath/src/parser.v2';
import { $, ExtJsObject } from '../extjs';

export default class MathGraph {
    private c: ExtJsObject;
    private m: canvas;
    constructor(existing?: ExtJsObject) {
        if (existing == undefined)
            this.c = $('body')
                .child('div')
                .child('canvas');
        else this.c = existing;

        this.c.cssObj({
            width: '100%',
            height: '300px',
            borderRadius: '4px'
        });

        this.m = new canvas(this.c.get(0));
    }

    public getGraph() {
        return this.c.parent('div').get(0);
    }

    public reload() {
        this.m.reload();
    }
}
