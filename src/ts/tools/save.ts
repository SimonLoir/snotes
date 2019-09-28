export let saveJSONAsFile = (function() {
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    return function(data: any, fileName: string) {
        var json = JSON.stringify(data),
            blob = new Blob([json], { type: 'octet/stream' }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
})();

export let saveAudioFile = (function() {
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    return function(data: any, fileName: string) {
        var json = data,
            blob = data,
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
})();
