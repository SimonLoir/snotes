import { $ } from '../tools/extjs';
import PDFLoader from './pdf.loader';
import { read } from 'fs';
import { snoteDocument } from '../core/json';
import loaderUI from './ui.loader';
import isNodeEnv from '../tools/env';

export default class FileLoader {
    public snoteDoc: Promise<snoteDocument>;
    constructor() {
        this.snoteDoc = new Promise((resolve: (doc: snoteDocument) => void) => {
            let i = $('body')
                .child('input')
                .change(async () => {
                    const ui = new loaderUI();
                    const base_file: File = i.get(0).files[0];
                    //console.log(base_file);
                    const ext = base_file.name.split('.').reverse()[0];
                    let images: string[];

                    if (ext == 'pdf')
                        images = await new PDFLoader().load(base_file);
                    else if (ext == 'snote' || ext == 'snotes') {
                        const result: snoteDocument = JSON.parse(
                            await this.readFilebAsText(base_file)
                        );
                        //@ts-ignore
                        if (isNodeEnv()) result.file_path = base_file.path;
                        ui.destroy();
                        return resolve(result);
                    }

                    const snoteDoc: snoteDocument = {
                        type: 'snote',
                        version: 3,
                        pages: [],
                        author: 'snote',
                    };

                    images.forEach((i) => {
                        snoteDoc.pages.push({
                            image: i,
                            objects: [],
                            htmlContent: '',
                        });
                    });

                    ui.destroy();
                    resolve(snoteDoc);
                })
                .attr('type', 'file')
                .click();
        });
    }

    private readFilebAsText(file: File) {
        const reader = new FileReader();

        return new Promise((resolve: (e: string) => void) => {
            reader.addEventListener('loadend', (e) => {
                //@ts-ignore
                resolve(e.srcElement.result);
            });

            reader.readAsText(file);
        });
    }
}
