import { snoteDocument } from '../core/json';
import RichTextBox from '../richtextbox';
import { $, ExtJsObject } from '../tools/extjs';
import { updateSize } from '..';
import audioRecorder from '../audio-recorder';

export default class snoteDocumentLoader {
    constructor(public doc: snoteDocument) {
        if (doc.pages.length < 1) {
            alert('Document non valide !');
            throw 'Erreur document';
        }

        switch (doc.version) {
            case 3:
                $('.slides').html('');
                $('.rich-textarea').remove();
                doc.pages.forEach((page) => {
                    const page_image_split = page.image.split('///');
                    page.richTextBox = new RichTextBox(page.htmlContent);
                    const [width, height] = page_image_split
                        .splice(0, 1)[0]
                        .split('x');

                    const svg = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'svg'
                    );

                    const image = svg.appendChild(
                        document.createElementNS(
                            'http://www.w3.org/2000/svg',
                            'image'
                        )
                    );

                    document.querySelector('.slides').appendChild(svg);

                    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
                    image.setAttributeNS(
                        'http://www.w3.org/1999/xlink',
                        'href',
                        page_image_split.join('///')
                    );
                    image.setAttribute('x', '0');
                    image.setAttribute('y', '0');
                    image.setAttribute('width', width);
                    image.setAttribute('height', height);

                    page.imageBox = $(svg);

                    /**
                     * Will be usefull for objects in slides
                     */
                    page.imageBox.click((e: MouseEvent) => {
                        const pt = svg.createSVGPoint(); // Created once for document

                        function alert_coords(evt: MouseEvent) {
                            pt.x = evt.clientX;
                            pt.y = evt.clientY;

                            // The cursor point, translated into svg coordinates
                            const cursorpt = pt.matrixTransform(
                                svg.getScreenCTM().inverse()
                            );
                            console.log(
                                '(' + cursorpt.x + ', ' + cursorpt.y + ')'
                            );
                        }
                        alert_coords(e);
                    });
                });
                $('.slides_switcher').remove();
                let page = 0;
                const slide_switcher = $('.workspace')
                    .child('div')
                    .addClass('slides_switcher');
                const previous = slide_switcher
                    .child('span')
                    .addClass('previous')
                    .addClass('material-icons')
                    .text('arrow_back');
                const current_page_ui = slide_switcher
                    .child('span')
                    .addClass('current_page');
                current_page_ui
                    .child('span')
                    .text('Page ')
                    .addClass('no-padding');

                const page_number: ExtJsObject = current_page_ui
                    .child('span')
                    .text((page + 1).toString())
                    .addClass('no-padding');

                current_page_ui
                    .child('span')
                    .text('/')
                    .addClass('no-padding');
                current_page_ui
                    .child('span')
                    .text(doc.pages.length.toString())
                    .addClass('no-padding');

                page_number.input(() => {
                    page = parseInt(page_number.text()) - 1;
                    updateView(false);
                });

                page_number.attr('contentEditable', 'true');
                page_number.addClass('blur-allowed');

                const updateView = (updateText = true) => {
                    if (updateText) page_number.text('' + (page + 1));

                    doc.pages.forEach((p, i) => {
                        if (page == i) {
                            p.richTextBox.show();
                            p.imageBox.css('display', 'block');
                        } else {
                            p.richTextBox.hide();
                            p.imageBox.css('display', 'none');
                        }
                    });
                };

                updateView();
                previous.click(() => {
                    page--;
                    if (page < 0) page = 0;
                    updateView();
                });

                new audioRecorder(slide_switcher);

                slide_switcher
                    .child('span')
                    .addClass('next')
                    .addClass('material-icons')
                    .text('arrow_forward')
                    .click(() => {
                        page++;
                        if (page > doc.pages.length - 1) {
                            page = doc.pages.length - 1;
                        }
                        updateView();
                    });

                $('.welcome-wrapper').css('display', 'none');
                updateSize();
                break;

            default:
                alert("Cette version n'est pas (ou plus) prise en charge.");
                break;
        }
    }
    public save() {
        this.doc.pages.forEach((p) => {
            p.htmlContent = p.richTextBox.html;
        });
        return this.doc;
    }
}
