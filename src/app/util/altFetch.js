

export default class AltFetch {　

  // Fetch Apiがデフォルトでprogress取得できんのでしかたなくxhr
  static load(url,onProgress,opts={},){
    return new Promise( (res, rej)=>{
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'GET', url,true);
        xhr.responseType = "text"
        xhr.getResponseHeader("Content-Length")
        for (var k in opts.headers||{})
            xhr.setRequestHeader(k, opts.headers[k]);

        xhr.onload = e => res(e.target.responseText);
        xhr.onerror = e=> console.error("xhr error",e)

        if (onProgress){
          // xhr.addEventListener("progress",function(ev){
          //     console.log(ev.loaded,ev.total);
          //     onProgress(ev)
          // });
          xhr.onprogress = (e)=>{
            if(e.lengthComputable){
              console.log("lengthComputable")
              onProgress(e); // event.loaded / event.total * 100 ; //event.lengthComputable
            }
          }
        }

        xhr.send(null);
    });
  }

  static ajaxload(_url,onProgress,opts={}){
    return new Promise((res,rej)=>{
      $.ajax({
        url: _url,
        type: 'get',
        dataType: 'json',
        xhr: ()=>{
          let xhr = $.ajaxSettings.xhr();
          xhr.onprogress = (e)=>{
            onProgress(e)
          }
          return xhr
        }
      }).done((e)=>{
          res(e)
      }).fail((e)=>{
          rej(e)
      })
    })
  }

  // eclass
}
