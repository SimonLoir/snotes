import { $ } from './extjs';
import { PDFJS } from '../js/pdf';
import '../js/pdf.worker';

function readDoc(doc: any) {
    return PDFJS.getDocument({ url: doc });
}
export default async function pdf2Base64Array(file: any) {
    return new Promise(async (resolve: (res: string[]) => void) => {
        let doc = await readDoc(file);
        $('#tmp').html('');
        let all: any[] = [];
        for (let i = 0; i < doc.numPages; i++) {
            let page = await doc.getPage(i + 1);
            let canvas = $('#tmp').child('canvas');
            let ctx = canvas.get(0).getContext('2d');
            let viewport = page.getViewport(2);
            canvas.attr('width', viewport.width);
            canvas.attr('height', viewport.height);
            all.push(
                page.render({
                    canvasContext: ctx,
                    viewport: viewport
                })
            );
        }
        Promise.all(all).then(() => {
            let res: string[] = [];
            $('#tmp canvas').forEach(function() {
                console.log(this);
                let c: HTMLCanvasElement = this;
                res.push(c.toDataURL());
            });
            $('#tmp canvas').remove();
            resolve(res);
        });
    });
}
