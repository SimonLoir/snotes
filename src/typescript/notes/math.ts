import canvas from '../../../lib/smath/src/canvas';
import Parser, { MathObject } from '../../../lib/smath/src/parser.v2';
import { $, ExtJsObject } from '../extjs';
const canvasID = '::simonloir.smath.core.graph::';
export default class MathGraph {
    private c: ExtJsObject;
    private m: canvas;
    constructor(existing?: ExtJsObject) {
        if (existing == undefined)
            this.c = $('body')
                .child('div')
                .child('canvas')
                .text(canvasID);
        else this.c = existing;

        if (
            window.getComputedStyle(this.c.parent('div').get(0)).position ==
            'static'
        )
            this.c.parent('div').css('position', 'relative');

        this.c.cssObj({
            width: '100%',
            height: '300px',
            borderRadius: '4px'
        });

        if (existing != undefined) {
            console.log(existing.text());
            let toDraw = existing.text().replace(canvasID, '');
        }

        this.m = new canvas(this.c.get(0));
    }

    public getGraph() {
        return this.c.parent('div').get(0);
    }

    public reload() {
        this.m.reload();
    }
}
