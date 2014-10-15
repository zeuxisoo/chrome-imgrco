;(function($) {

    $(function() {
        chrome.storage.sync.get({
            debug : false,
            apiKey: ''
        }, function(items) {
            console.log(items);
            $('#debug').prop('checked', items.debug);
            $('#api-key').val(items.apiKey);
        });


        $('#save-button').click(function() {
            var apiKey = $("#api-key").val();
            var debug  = $("#debug").is(":checked");

            if (apiKey === "") {
                alert('Please enter API key');
                return;
            }

            console.log(debug);

            chrome.storage.sync.set({
                debug : debug,
                apiKey: apiKey
            }, function() {
                $('.message-block').text('Saved!').fadeIn('fast', function() {
                    $(this).fadeOut(1200);
                });
            });
        });
    });

})(jQuery);
