import RichTextBox from '../richtextbox';
import { ExtJsObject } from '../tools/extjs';

export interface snoteDocument {
    type: 'snote';
    version: number;
    file_path?: string;
    pages: {
        image: string; //svg image
        imageBox?: ExtJsObject;
        objects: {
            x: number;
            y: number;
        }[];
        htmlContent: string;
        richTextBox?: RichTextBox;
    }[];
    author: string;
}
