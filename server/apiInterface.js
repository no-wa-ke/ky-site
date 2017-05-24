import contentful from "contentful"
import marked from "marked"
import ApiConfig from './config'
import AppStore from './store'


export default class ApiInterface {

  constructor(){

    this.client = contentful.createClient({
      space: ApiConfig.space,
      accessToken: ApiConfig.token,
    })

  }

  getPost($slug){
    return new Promise((resolve,reject)=>{
      this.client.getEntries({
        content_type: ApiConfig.contentType.work,
        "fields.slug":$slug
      })
      .then((entries)=>{
        AppStore.state.posts = entries.items

      })
      .then(()=>{
        resolve()
      })

    }).catch(err=>reject());

  }
}
