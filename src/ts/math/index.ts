import NoteObject from '../object/object';
import { $ } from '../tools/extjs';

export default class SNotesMath extends NoteObject {
    public static type = 'snote_math_object';
    protected build() {
        const e = $(this.e);
        e.attr('contentEditable', 'false');
        e.html('');
        e.child('span')
            .attr('contentEditable', 'false')
            .text('Default text');
        e.child('span')
            .text('×')
            .click(() => {
                e.remove();
            });
    }
}
