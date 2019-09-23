import { $ } from '../tools/extjs';
import PDFLoader from './pdf.loader';
import { read } from 'fs';
import { snoteDocument } from '../core/json';

export default class FileLoader {
    private data: Promise<snoteDocument>;
    constructor() {
        let i = $('body')
            .child('input')
            .change(async () => {
                const base_file: File = i.get(0).files[0];
                const ext = base_file.name.split('.').reverse()[0];
                let images: string[];

                if (ext == 'pdf')
                    images = await new PDFLoader().load(base_file);

                if (ext == 'snote')
                    return JSON.stringify(
                        await this.readFilebAsText(base_file)
                    );

                console.log(images);
                images.forEach(i => {
                    document.body.innerHTML += i;
                });
            })
            .attr('type', 'file');
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
