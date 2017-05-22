import debounce from "debounce"
import RiotControl from "riotcontrol"
import AppStore from "../store/app.store"
import ActionTypes from "./app.actiontypes"
import ApiInterface from '../api/api.interface.js'
import Loader from '../components/loader/loader'

const appAction = new class AppAction {

  constructor() {
    console.log('APP ACTION INIT')
    window.onresize = debounce(this.onresize, 200)
    this.api = new ApiInterface()
    this.loader = new Loader()
  }

  getAllPosts(){
    this.api.getAllPosts()
    .then(()=>{RiotControl.trigger(ActionTypes.ON_TOP_CONTENTS_LOADED)})
  }
  getFilteredPosts(arg){
    this.api.getFilteredPosts(arg)
    .then(()=>{RiotControl.trigger(ActionTypes.ON_TOP_CONTENTS_LOADED)})
  }

  getPost($slug){
    return new Promise((resolve,reject)=>{
      this.loader.showTransition()
      .then(()=>this.api.getPost($slug))
      .then(()=>{
        RiotControl.trigger(ActionTypes.ON_POST_CONTENT_LOADED)
        resolve()
      })
    })
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
