import canvas from '../../../lib/smath/src/canvas';
import Parser, { MathObject } from '../../../lib/smath/src/parser.v2';
import { $, ExtJsObject } from '../extjs';
import Popup from '../popup';
const canvasID = '::simonloir.smath.core.graph::';
export default class MathGraph {
    private c: ExtJsObject;
    private m: canvas;
    private func: string[];
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

        this.m = new canvas(this.c.get(0));
        if (existing != undefined) {
            console.log(existing.html(), existing);
            let toDraw = existing.html().replace(canvasID, '');
            toDraw = toDraw == '' ? '{}' : toDraw;
            console.log(toDraw);
            this.func = JSON.parse(toDraw);
            this.drawForFirstTime();
        }
    }

    public drawForFirstTime() {
        this.c.dblclick(() => {
            let p = new Popup();
            p.content.child('h2').text('Modifier le graphique');
            let d: any = this.m.funcs;
            let keys = Object.keys(d);
            keys.forEach(key => {
                let x = p.content.child('p');
                x.child('input')
                    .value(d[key].color)
                    .attr('type', 'color');
                x.child('input')
                    .value(d[key].initial)
                    .attr('type', 'text');
            });
            let add = p.content
                .child('button')
                .text('+')
                .click(() => {
                    let x = p.content.child('p');
                    x.child('input')
                        .value('#000')
                        .attr('type', 'color');
                    x.child('input')
                        .value('')
                        .attr('type', 'text');
                    let a: HTMLDivElement = add.get(0);
                    a.parentElement.insertBefore(x.get(0), a);
                });
            let save = p.content.child('button');
            save.text('Confirmer');
            save.click(() => {
                let i = 0;
                let d: any = {};
                p.content.children('p').forEach(function() {
                    let exp = $(this)
                        .children('input')
                        .only(1)
                        .value();
                    d['func' + i] = {
                        visible: true,
                        color: $(this)
                            .children('input')
                            .only(0)
                            .value(),
                        exp: exp,
                        initial: exp,
                        array: parser.Functionize(exp)
                    };
                    i++;
                });
                this.func = d;
                this.m.funcs = d;
                this.saveState();
            });
            this.saveState();
        });
        let d: any = this.func;
        let keys = Object.keys(d);
        let parser = new Parser();
        keys.forEach(key => {
            d[key].array = parser.Functionize(d[key].exp);
        });
        this.m.funcs = d;
    }

    private saveState() {
        this.c.text(canvasID + JSON.stringify(this.func));
    }

    public getGraph() {
        return this.c.parent('div').get(0);
    }

    public reload() {
        this.m.reload();
    }
}
