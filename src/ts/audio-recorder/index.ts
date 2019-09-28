import { ExtJsObject } from '../tools/extjs';
import { saveAudioFile } from '../tools/save';

export default class audioRecorder {
    constructor(slide_switcher: ExtJsObject) {
        if (!('getUserMedia' in navigator)) return;
        return;
        let on = false;

        const record_toggle = slide_switcher
            .child('span')
            .addClass('recording')
            .addClass('material-icons')
            .text('mic');

        const record_status = slide_switcher.child('span').text('00:00:00');

        let recorder: MediaRecorder;
        let chunks: any[] = [];
        let time: number;

        record_toggle.click(async () => {
            if (!on) {
                time = new Date().getTime();
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                recorder = new MediaRecorder(stream);

                console.log(stream, recorder);
                on = true;
                chunks = [];

                recorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                };

                recorder.onstop = () => {
                    //console.log('stop');
                    let blob = new Blob(chunks, {
                        type: 'audio/ogg; codecs=opus',
                    });

                    console.log(URL.createObjectURL(blob));
                    var blobToBase64 = function(blob: Blob, callback: any) {
                        var reader = new FileReader();
                        reader.onload = function() {
                            var dataUrl = reader.result;
                            //@ts-ignore
                            var base64 = dataUrl.split(',')[1];
                            callback(base64);
                        };
                        reader.readAsDataURL(blob);
                    };

                    blobToBase64(blob, function(b64: string) {
                        console.log('data:audio/ogg;base64,' + b64);
                    });
                    //saveAudioFile(blob, 'test.ogg');
                };

                recorder.start();
                console.log('start');
                const updateTime = () => {
                    record_status.text(new Date().getTime() - time);
                    if (on) setTimeout(updateTime, 1000);
                };
                updateTime();
            } else {
                on = false;
                recorder.stop();
            }
        });
    }
}

declare interface MediaRecorderErrorEvent extends Event {
    name: string;
}

declare interface MediaRecorderDataAvailableEvent extends Event {
    data: any;
}

interface MediaRecorderEventMap {
    dataavailable: MediaRecorderDataAvailableEvent;
    error: MediaRecorderErrorEvent;
    pause: Event;
    resume: Event;
    start: Event;
    stop: Event;
    warning: MediaRecorderErrorEvent;
}

declare class MediaRecorder extends EventTarget {
    readonly mimeType: string;
    readonly state: 'inactive' | 'recording' | 'paused';
    readonly stream: MediaStream;
    ignoreMutedMedia: boolean;
    videoBitsPerSecond: number;
    audioBitsPerSecond: number;

    ondataavailable: (event: MediaRecorderDataAvailableEvent) => void;
    onerror: (event: MediaRecorderErrorEvent) => void;
    onpause: () => void;
    onresume: () => void;
    onstart: () => void;
    onstop: () => void;

    constructor(stream: MediaStream);

    start(): any;

    stop(): any;

    resume(): any;

    pause(): any;

    isTypeSupported(type: string): boolean;

    requestData(): any;

    addEventListener<K extends keyof MediaRecorderEventMap>(
        type: K,
        listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;

    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void;

    removeEventListener<K extends keyof MediaRecorderEventMap>(
        type: K,
        listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;

    removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions
    ): void;
}
