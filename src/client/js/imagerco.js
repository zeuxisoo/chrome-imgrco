var dataURItoBlob = function(dataURI) {
    var byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    }else{
        byteString = unescape(dataURI.split(',')[1]);
    }

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

chrome.contextMenus.create({
    "title": "ImageRCO -----> --->",
    "contexts": ["image"],
    "onclick": function(info, tab) {
        chrome.storage.sync.get({
            debug : true,
            apiKey: ''
        }, function(options) {
            console.log(options);
            var debug      = options.debug;
            var apiKey     = options.apiKey;

            var ocrService = 'http://api.ocrapiservice.com/1.0/rest/ocr';
            var srcUrl     = info.srcUrl;
            var formData   = new FormData();

            if (debug === true) {
                ocrService = 'http://localhost:8080/index.php';
            }

            console.log('API KEY : %s', apiKey);
            console.log('Debug   : %s', debug ? 'YES' : 'NO');
            console.log('OCR     : %s', ocrService);

            console.log('Action  : FormData');

            formData.append('image', dataURItoBlob(srcUrl), 'someName.png');
            formData.append('language', 'en');
            formData.append('apikey', apiKey);

            console.log('Action  : AJAX');

            $.ajax({
                type       : 'POST',
                url        : ocrService,
                data       : formData,
                // dataType   : 'JSON',
                processData: false,
                contentType: false
            }).success(function(response) {
                console.log('Action  : AJAX Success');
                console.log('Response:');
                console.log('==>');
                console.log(response);

                if (response.indexOf(':') !== -1) {
                    var code = response.split(':')[1].trim();
                }else{
                    var code = response.trim();
                }

                window.prompt('Success! Your OCR code', code);
            }).fail(function(response) {
                console.log('Action  : AJAX Failed');
                console.log('Response:');
                console.log('==>');
                console.log(response);

                window.prompt('Failed! Response message', response.responseText);
            });
        });
    }
});
