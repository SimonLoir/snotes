import { $ } from '../tools/extjs';
import PDFLoader from './pdf.loader';
import { read } from 'fs';
import { snoteDocument } from '../core/json';

export default class FileLoader {
    public snoteDoc: Promise<snoteDocument>;
    constructor() {
        this.snoteDoc = new Promise((resolve: (doc: snoteDocument) => void) => {
            let i = $('body')
                .child('input')
                .change(async () => {
                    const base_file: File = i.get(0).files[0];
                    console.log(base_file);
                    const ext = base_file.name.split('.').reverse()[0];
                    let images: string[];

                    if (ext == 'pdf')
                        images = await new PDFLoader().load(base_file);

                    if (ext == 'snote')
                        return resolve(
                            JSON.parse(await this.readFilebAsText(base_file))
                        );

                    const snoteDoc: snoteDocument = {
                        type: 'snote',
                        version: '2',
                        pages: [],
                        author: 'snote'
                    };

                    images.forEach(i => {
                        snoteDoc.pages.push({
                            image: i,
                            objects: [],
                            htmlContent: 'Hello world'
                        });
                    });

                    resolve(snoteDoc);
                })
                .attr('type', 'file')
                .click();
        });
    }

    private readFilebAsText(file: File) {
        const reader = new FileReader();

        return new Promise((resolve: (e: string) => void) => {
            reader.addEventListener('loadend', e => {
                //@ts-ignore
                resolve(e.srcElement.result);
            });

            reader.readAsText(file);
        });
    }
}
