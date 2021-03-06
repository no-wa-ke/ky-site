import EndPoint from './api.endpoint'
import Utils from '../util/utils'
import contentful from "contentful"
import marked from "marked"
import ApiConfig from './api.config'
import AppStore from '../store/app.store'

export default class ApiInterface {

  constructor(){

    this.client = contentful.createClient({
      space: ApiConfig.space,
      accessToken: ApiConfig.token,
    })

  }

  getAllPosts(){
    return new Promise((resove,reject)=>{
      this.client.getEntries({
        content_type: ApiConfig.contentType.work,
        "select":ApiConfig.fields.top
      })
      .then((entries)=>{

        AppStore.state.posts.top = this.sortByDate(entries.items)

      })
      .then(()=>{
        // RiotControl.trigger(ActionTypes.ON_TOP_CONTENTS_LOADED)
        resove()
      })
    }).catch(err=>reject(err))
  }

  getFilteredPosts(type='client'){

    return new Promise((resolve,reject)=>{
      this.client.getEntries({
        content_type: ApiConfig.contentType.work,
        "fields.type": type,
        "select":ApiConfig.fields.top
      })
      .then((entries)=>{
        AppStore.state.posts.top = this.sortByDate(entries.items)
      })
      .then(()=>{
        resolve()
      })
    }).catch(err=>reject(err))
  }


  getPost($slug){
    return new Promise((resolve,reject)=>{

      this.client.getEntries({
        content_type: ApiConfig.contentType.work,
        "fields.slug":$slug
      })
      .then((entries)=>{

        AppStore.state.posts.post = entries.items
        AppStore.state.posts.post.forEach((entry)=>{
          entry.fields.post = marked(entry.fields.post)
        })

      })
      .then(()=>{
        console.log('POST RETRIVED::',AppStore.state.posts.post)
        // RiotControl.trigger(ActionTypes.ON_POST_CONTENT_LOADED)
        resolve()
      })

    }).catch(err=>reject())
  }

  sortByDate($array){
    let _array = $array
    _array.sort((a,b)=>{
      console.log("sorting array",a.fields.releaseDate,b.fields.releaseDate)
      let key1 = a.fields.releaseDate;
      let key2 = b.fields.releaseDate;
      return (key1 < key2 ? 1 : -1);
      // if (key1 < key2) {
      //     return 1;
      // } else if (key1 == key2) {
      //     return 0;
      // } else {
      //     return 1;
      // }
    })
    return _array
  }



    /*
  static request (){
    return new Promise((resolve,reject)=>{

        let api = $apiObj

        if(!api.param){
          api.param = {}
        }

        if(api.query) api.base.uri = Util.replaceCurlyBraces(api.base.uri,$apiObj.query)

        // let loader = new Loader()
        // if(api.showLoader) loader.trigger(LoaderActionType.show_loader,api.showLoader)

        $.ajax({
          url: EndPoint.init(api.base.uri), //エンドポイントをapiのuri足す
          method : api.base.method,　//apiのメソッドを記載
          data: $.param(api.param)
        })
        .then(
          (data)=>{
            console.log('api success',data)
            // if(api.showLoader) loader.trigger(LoaderActionType.hide_loader)
            resolve(data)
          },
          (err)=>{
            console.log('api error',err)
            // if(api.showLoader) loader.trigger(LoaderActionType.hide_loader)
            reject(err)
          })
      })

  }*/

}
