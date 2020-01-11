document.addEventListener('DOMContentLoaded', () => {

    let defaultUrl = 
        'http://informer.gismeteo.ru/rss/27612.xml';


    function createXHR(url, method, cb) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });

        xhr.send();
    }

    createXHR(defaultUrl, 'GET', function(e) {
        let data = e;
        data.forEach(item => console.log(item.name))
    });
});