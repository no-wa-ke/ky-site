/**
* apiのエンドポイント設定
*　デバッグモードでreqresにリクエストします　
*/



class EndPoint{

  static get URI(){
    let url
    url = window.location.protocol + "//matchbox.s2factory.co.jp/api/v1"
    return url
  }

  static init(uri){
    uri =  EndPoint.URI + uri
    return uri
  }
}
export default EndPoint
