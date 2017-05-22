/**
* そんなに頻繁に使わないけど、鬱陶しい静的関数はこっちにまとめたい
*/



class Utils {

  static replaceCurlyBraces(str,mapObj={}){
    const literal = /{(.+?)}/g
    let result = str;
    let targetArray = str.match(literal)

    let replaceWith = Object.keys(mapObj).map(key => mapObj[key])

    // 配列の格納してkeyに沿って処理
    for (var i = 0; i < targetArray.length; i++) {

      result = result.replace(new RegExp(targetArray[i],'gi'),replaceWith[i])

    }

    if(!result){
      throw new Error("パースに失敗しました。")
      return false
    }else{
      return result
    }

  }

  static _promiseTimeout(time){
    return new Promise(done => {
      setTimeout(done, time)
    })
  }
  static _setIframeResponsive(){
    // Find all YouTube videos
    var $allVideos = $("iframe[src^='//www.youtube.com']"),

        // The element that is fluid width
        $fluidEl = $("body");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

      $(this)
        .data('aspectRatio', this.height / this.width)

        // and remove the hard coded width/height
        .removeAttr('height')
        .removeAttr('width');

    });

    // When the window is resized
    $(window).resize(function() {
      var newWidth = $fluidEl.width();

      // Resize all videos according to their own aspect ratio
      $allVideos.each(function() {

        var $el = $(this);
        $el
          .width(newWidth)
          .height(newWidth * $el.data('aspectRatio'));
          console.log('YOUTUBE',newWidth)

      });

    // Kick off one resize to fix all videos on page load
    }).resize();
  }
}



export default Utils
