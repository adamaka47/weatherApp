document.addEventListener('DOMContentLoaded', () => {

    const form = document.forms[0];
    const input = form.querySelector('input');
    const info = document.querySelector('.main-block')
    const spans = document.querySelectorAll('.loaders span');
    const img = new Image();
    img.classList.add('wowic');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        for (let i = 0; i < spans.length; i++) {
            spans[i].textContent = 'loading...'
        }
        const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&APPID=2fe739a8d74f850b406823d82ba3a0ea`
        createXHR(defaultUrl, 'GET', function(e) {
            let data = e;
            console.log(data)
            try {
                if (data.cod === 404) {
                    throw new Error();
                }
                img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                info.insertAdjacentElement('afterbegin', img);
                spans[0].textContent = data.name || 'Unknown';
                spans[1].textContent = data.weather[0].main || 'Unknown';
                spans[2].textContent = (data.main.temp - 273).toFixed(1) + '°C' || 'Unknown';
                spans[3].textContent = +data.wind['speed'].toFixed(2) + '/10' || 'Unknown';
                spans[4].textContent = data.sys['country'];   
            } catch(e) {
                for (let i = 0; i < spans.length; i++) {
                    spans[i].textContent = '...'
                }  
                alert(data.message || e.name)
            }
        })
    })

    function createXHR(url, method, cb) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });

        xhr.send();
    }
});