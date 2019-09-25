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
    }[];
    author: string;
}
