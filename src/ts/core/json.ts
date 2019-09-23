export interface snoteDocument {
    type: 'snote';
    version: '2';
    pages: {
        image: string; //base64 string
        objects: {
            x: number;
            y: number;
            z: number;
        }[];
        htmlContent: string;
    }[];
    author: string;
}
