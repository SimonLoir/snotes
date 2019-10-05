import NoteObject from '../object/object';
import { $, ExtJsObject } from '../tools/extjs';

import './math.scss';
export default class SNotesMath extends NoteObject {
    public static type = 'snote_math_object';
    public static className = 'snotes-math-object';
    private focus_element: HTMLElement;
    private items = [
        {
            trigger: 'integral',
            code: () => document.execCommand('insertHTML', null, '&int;'),
        },
        {
            trigger: 'forall',
            code: () => document.execCommand('insertHTML', null, '&#8704;'),
        },
        {
            trigger: 'complement',
            code: () => document.execCommand('insertHTML', null, '&#8705;'),
        },
        {
            trigger: 'part_diff',
            code: () => document.execCommand('insertHTML', null, '&#8706;'),
        },

        {
            trigger: 'exists',
            code: () => document.execCommand('insertHTML', null, '&#8707;'),
        },

        {
            trigger: '!exists',
            code: () => document.execCommand('insertHTML', null, '&#8708;'),
        },

        {
            trigger: 'nabla',
            code: () => document.execCommand('insertHTML', null, '&nabla;'),
        },

        {
            trigger: 'in',
            code: () => document.execCommand('insertHTML', null, '&isin;'),
        },

        {
            trigger: 'not_in',
            code: () => document.execCommand('insertHTML', null, '&notin;'),
        },

        {
            trigger: 'sum',
            code: () => document.execCommand('insertHTML', null, '&sum;'),
        },

        {
            trigger: 'minplus',
            code: () => document.execCommand('insertHTML', null, '&#8723;'),
        },

        {
            trigger: 'set_minus',
            code: () => document.execCommand('insertHTML', null, '&#8726;'),
        },

        {
            trigger: 'sqrt',
            code: () => document.execCommand('insertHTML', null, '&radic;'),
        },

        {
            trigger: 'infinity',
            code: () => document.execCommand('insertHTML', null, '&infin;'),
        },
    ];
    protected build() {
        const e = $(this.e);
        e.attr('contentEditable', 'false');
        e.html('');
        const line: ExtJsObject = e
            .child('span')
            .attr('contentEditable', 'true')
            .text(' ');
        let isMathObj = false;
        line.keydown((e: KeyboardEvent) => {
            //@ts-ignore
            console.log(getCursorPosition(e.target));
            /*if (e.key == 'x') {
                e.preventDefault();
                document.execCommand('insertHTML', null, '&#119909;');
            }*/
        });
        line.input((e: InputEvent) => {
            if (isMathObj) {
                if (e.data == '\\') isMathObj = false;
            } else if (e.data == '\\') {
                isMathObj = true;
                console.log(e);
            } else if (e.data == ' ') {
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
                    if (char == undefined || char == ' ')
                        return document.execCommand('insertText', null, ' ');
                    buffer = char + buffer;
                    if (char == '\\') break;
                }

                if (buffer[0] != '\\')
                    return document.execCommand('insertText', null, ' ');

                for (let i = 0; i < this.items.length; i++) {
                    const item = this.items[i];
                    if (buffer == `\\${item.trigger}\\`) {
                        for (let i = 0; i < buffer.length; i++) {
                            document.execCommand('delete');
                        }
                        return item.code();
                    }
                }
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
