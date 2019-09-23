import '../scss/index.scss';
import isNodeEnv from './tools/env';
import { PDFJS } from '../js/pdf';
import '../js/pdf.worker';
console.log(PDFJS);
console.log(PDFJS.openDocument);
