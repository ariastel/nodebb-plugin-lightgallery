require(['jquery'], function ($) {
    require(['lightgallery'], function () {
        require(['lg-thumbnail', 'lg-autoplay', 'lg-fullscreen', 'lg-pager', 'lg-zoom'], function () {
            $(document).ready(function () {
                initLightGallery();
            });
            $(window).on('action:topic.loaded', function () {
                initLightGallery();
            });
            function initLightGallery() {
                $("[id^=lightgallery]").lightGallery({
                    exThumbImage: 'data-exThumbImage',
                    selector: 'a > img'
                });
            }
        });
    });
});