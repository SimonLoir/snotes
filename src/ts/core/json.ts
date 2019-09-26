import RichTextBox from '../richtextbox';

export interface snoteDocument {
    type: 'snote';
    version: number;
    pages: {
        image: string; //svg image
        objects: {
            x: number;
            y: number;
        }[];
        htmlContent: string;
        richTextBox?: RichTextBox;
    }[];
    author: string;
}
