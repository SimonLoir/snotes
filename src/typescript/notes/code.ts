import { editor } from '../../../lib/scode-code-editor-interface/src/index';
import { $, ExtJsObject } from '../extjs';
export default class CodeEditor {
    private c: ExtJsObject;
    constructor(existing: ExtJsObject) {
        this.c = existing;

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

        new editor(this.c.get(0));
    }
}
