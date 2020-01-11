
"use strict";document.addEventListener('DOMContentLoaded',function(){var defaultUrl='http://informer.gismeteo.ru/rss/27612.xml';function createXHR(url,method,cb){var xhr=new XMLHttpRequest();xhr.open(method,url);xhr.responseType='json';xhr.addEventListener('load',function(){cb(xhr.response);});xhr.send();}
createXHR(defaultUrl,'GET',function(e){var data=e;data.forEach(function(item){return console.log(item.name);});});});
//# sourceMappingURL=script.js.map
