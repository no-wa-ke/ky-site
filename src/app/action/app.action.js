import debounce from "debounce"
import RiotControl from "riotcontrol"
import AppStore from "../store/app.store"
import ActionTypes from "./app.actiontypes"

const appAction = new class AppAction {
  constructor() {
    window.onresize = debounce(this.onresize, 200)

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
