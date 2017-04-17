import debounce from "debounce"
import RiotControl from "riotcontrol"
import AppStore from "../store/app.store"
import ActionTypes from "./app.actiontypes"
import contentful from "contentful"
import marked from "marked"


const appAction = new class AppAction {

  constructor() {
    window.onresize = debounce(this.onresize, 200)

    //contentful api
    this.client = contentful.createClient({
      space: AppStore.config.api.space,
      accessToken: AppStore.config.api.token,
    })


  }

  getAllPosts(){
    this.client.getEntries({
      content_type: AppStore.config.api.contentType.work,
      "select":AppStore.config.api.fields.top
    })
    .then((entries)=>{

      AppStore.data.posts.top = this.sortByDate(entries.items)

    })
    .then(()=>{
      RiotControl.trigger(ActionTypes.ON_TOP_CONTENTS_LOADED)
    })
  }



  getPost($slug,cb){
    this.client.getEntries({
      content_type: AppStore.config.api.contentType.work,
      "fields.slug":$slug,

    })
    .then((entries)=>{
      console.log("**********got post**********",entries.items)
      AppStore.data.posts.post = entries.items

      AppStore.data.posts.post.forEach((entry)=>{

        entry.fields.post = marked(entry.fields.post)

      })
    })
    .then(()=>{
      RiotControl.trigger(ActionTypes.ON_POST_CONTENT_LOADED)
      cb();
    })
  }


  sortByDate($array){
    let _array = $array
    _array.sort((a,b)=>{
      console.log("sorting array",a,b)
      let key1 = a.fields.releaseDate;
      let key2 = b.fields.releaseDate;
      if (key1 < key2) {
          return -1;
      } else if (key1 == key2) {
          return 0;
      } else {
          return 1;
      }
    })
    return _array
  }

  onresize() {
    AppStore.config.ww = window.innerWidth
    let ww = AppStore.config.ww
    let wm = AppStore.config.mode
      // デバイス判定
    let toggleMode = (mode) => {
      for (var key in wm) {
        if (key == mode) {
          AppStore.config.mode[key] = true
        } else {
          AppStore.config.mode[key] = false
        }
      }
    }

    if (ww >= 1400) {

      toggleMode("desktop")
    }
    if (ww < 1399 && ww >= 1026) {

      toggleMode("laptop")
    }
    if (ww < 1025 && ww >= 768) {

      toggleMode("tablet")

    }

    if (ww < 767) {

      toggleMode("sp")

    }

    //イベントトリガー
    console.log("window on resize", wm, ww)
    RiotControl.trigger(ActionTypes.ON_RESIZE, wm)

  }
}

export default appAction
