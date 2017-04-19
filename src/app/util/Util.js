/**
* そんなに頻繁に使わないけど、鬱陶しい静的関数はこっちにまとめたい
*/



class Util {

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

}



export default Util
