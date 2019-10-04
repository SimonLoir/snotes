import loaderUI from './ui.loader';

export default class PDFLoader {
    load(base_file: File, loader: loaderUI) {
        //@ts-ignore
        const PDFJS = window.XPDF;
        const file = URL.createObjectURL(base_file);
        loader.text = 'Ouverture du PDF';
        return new Promise(async (resolve: (e: string[]) => void) => {
            const ext = base_file.name.split('.').reverse()[0];
            if (ext != 'pdf')
                throw "Erreur lors du chargement : ce fichier n'est pas un PDF";

            const doc = await PDFJS.getDocument({ url: file });
            const images: string[] = [];
            for (let i = 0; i < doc.numPages; i++) {
                loader.text = `Ouverture du PDF - page ${i + 1} / ${
                    doc.numPages
                }`;

                const page = await doc.getPage(i + 1);
                //console.log(await page.getTextContent()); // get the content of the page ~ 2.5
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const viewport = page.getViewport(1.5);
                canvas.setAttribute('width', viewport.width);
                canvas.setAttribute('height', viewport.height);
                await page.render({
                    canvasContext: ctx,
                    viewport: viewport,
                });
                images.push(
                    canvas.width +
                        'x' +
                        canvas.height +
                        '///' +
                        canvas.toDataURL()
                );
                canvas.remove();
            }
            resolve(images);
        });
    }
}
