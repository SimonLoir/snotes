import RichTextBox from '../richtextbox';

export interface snoteDocument {
    type: 'snote';
    version: '2';
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
