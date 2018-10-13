declare module 'html2pdf.js' {
    interface image {
        type: string;
        quality: number;
    }
    interface html2pdfjsoptions {
        margin?: number | number[];
        filename?: string;
        image?: image;
        enableLinks?: boolean;
        html2canvas?: any;
        jsPDF?: any;
    }
    class html2pdfjs {
        public from(src: string | Element, type?: string): html2pdfjs;
        public set(opt: html2pdfjsoptions): html2pdfjs;
        public save(): any;
    }
    function html2pdf(src?: string | Element, type?: string): html2pdfjs;
    export default html2pdf;
}
