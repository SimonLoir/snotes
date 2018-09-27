import { $, ExtJsObject } from '../extjs';

export default class Notes {
    constructor(default_html: string) {
        let el: ExtJsObject = $('#notes')
            .child('div')
            .addClass('rich-textarea')
            .attr('spellcheck', 'true')
            .attr('contenteditable', 'true')
            .css('display', 'none')
            .html(default_html);
        el.keydown((e: KeyboardEvent) => {
            let c = e.keyCode;
            let isMathKey = c == 77 && e.ctrlKey == true;
            if (c == 9 || isMathKey) e.preventDefault();
            if (isMathKey) {
                el.get(0).focus();
                let selection = document.getSelection().getRangeAt(0);
                console.log(selection);
                if (selection.startContainer.nodeType == 3) {
                    //@ts-ignore
                    let spl: Text = selection.startContainer;
                    let e: Node = spl.splitText(selection.startOffset);
                    e.parentElement.insertBefore(
                        document.createElement('div'),
                        e
                    );
                }
            }
            console.log(e.keyCode);
        });
    }
}

class toolkit {
    public static getCursorPosition(target: any) {
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

    public static getRangeLength(target: any) {
        let childNodes: Array<any> = target.childNodes;

        let selection = document.getSelection().getRangeAt(0);

        let start = this.getCursorPosition(target);

        let length_before = 0;

        for (const node of childNodes) {
            if (
                node == selection.endContainer ||
                node.contains(selection.endContainer)
            )
                return length_before + selection.endOffset - start;

            if (node.nodeType == 1) {
                length_before += node.innerText.length;
            } else if (node.nodeType == 3) {
                length_before += node.data.length;
            }
        }
    }

    // from (en) https://social.msdn.microsoft.com/Forums/fr-FR/f91341cb-48b3-424b-9504-f2f569f4860f/getset-caretcursor-position-in-a-contenteditable-div?forum=winappswithhtml5

    public static setCaretPos(el: any, sPos: number) {
        var charIndex = 0,
            range = document.createRange();

        range.setStart(el, 0);

        range.collapse(true);

        var nodeStack = [el],
            node,
            foundStart = false,
            stop = false;

        while (!stop && (node = nodeStack.pop())) {
            if (node.nodeType == 3) {
                var nextCharIndex = charIndex + node.length;

                if (!foundStart && sPos >= charIndex && sPos <= nextCharIndex) {
                    range.setStart(node, sPos - charIndex);

                    foundStart = true;
                }

                if (foundStart && sPos >= charIndex && sPos <= nextCharIndex) {
                    range.setEnd(node, sPos - charIndex);

                    stop = true;
                }

                charIndex = nextCharIndex;
            } else {
                var i = node.childNodes.length;

                while (i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }

        let selection = window.getSelection();

        selection.removeAllRanges();

        selection.addRange(range);
    }
}
