import { snoteDocument } from '../core/json';
import RichTextBox from '../richtextbox';
import { $ } from '../tools/extjs';

export default class snoteDocumentLoader {
    constructor(private doc: snoteDocument) {
        console.log(doc);
        if (doc.pages.length < 1) {
            alert('Document non valide !');
            throw 'Erreur document';
        }
        switch (doc.version) {
            case 3:
                doc.pages.forEach((page) => {
                    page.richTextBox = new RichTextBox(page.htmlContent);
                });
                console.log(doc.pages);
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
                const updateView = () => {
                    current_page_ui.text(
                        `Page ${page + 1}/${doc.pages.length}`
                    );

                    doc.pages.forEach((p, i) => {
                        if (page == i) p.richTextBox.show();
                        else p.richTextBox.hide();
                    });
                };

                updateView();
                previous.click(() => {
                    page--;
                    if (page < 0) page = 0;
                    updateView();
                });
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
                break;

            default:
                alert("Cette version n'est pas (ou plus) prise en charge.");
                break;
        }
    }
    public save() {
        let e = { ...this.doc };
        e.pages.forEach((p) => {
            p.htmlContent = p.richTextBox.html;
            p.richTextBox = undefined;
        });
        return e;
    }
}
