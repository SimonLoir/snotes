import NoteObject from '../object/object';
import { $, ExtJsObject } from '../tools/extjs';

import './math.scss';
export default class SNotesMath extends NoteObject {
    public static type = 'snote_math_object';
    public static className = 'snotes-math-object';
    private focus_element: HTMLElement;
    protected build() {
        const e = $(this.e);
        e.attr('contentEditable', 'false');
        e.html('');
        const line: ExtJsObject = e
            .child('span')
            .attr('contentEditable', 'true')
            .text(' ');
        line.keydown((e: KeyboardEvent) => {
            //@ts-ignore
            console.log(getCursorPosition(e.target));
            if (e.key == 'x') {
                e.preventDefault();
                document.execCommand('insertHTML', null, '&#119909;');
            }
        });

        line.input((e: InputEvent) => {
            if (e.data == ' ') {
                e.preventDefault();
                document.execCommand('delete');
                //@ts-ignore
                const text = e.target.innerText;
                const pos = getCursorPosition(e.target) - 1;

                if (text[pos] != '\\')
                    return document.execCommand('insertText', null, ' ');

                let buffer = '\\';

                for (let i = 1; i < 10; i++) {
                    const char = text[pos - i];
                    buffer = char + buffer;
                    if (char == '\\') break;
                }

                console.log(buffer);

                if (buffer == '\\int\\') {
                    for (let i = 0; i < buffer.length; i++) {
                        document.execCommand('delete');
                    }
                    document.execCommand('insertHTML', null, '&int;');
                }

                console.log(pos, text[pos]);
            }
        });
        this.focus_element = line.get(0);
    }
    public focus() {
        this.focus_element.focus();
    }
}

function getCursorPosition(target: any) {
    let childNodes: Array<any> = target.childNodes;
    let selection = document.getSelection().getRangeAt(0);
    let length_before = 0;

    for (const node of childNodes) {
        if (
            node == selection.startContainer ||
            node.contains(selection.startContainer)
        )
            return length_before + selection.startOffset;

        if (node.nodeType == 1) {
            length_before += node.innerText.length;
        } else if (node.nodeType == 3) {
            length_before += node.data.length;
        }
    }
}
