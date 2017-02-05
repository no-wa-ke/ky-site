import riot from 'riot'
import RiotControl from 'riotcontrol'
import ActionTypes from '../action/app.actiontypes'

const appStore = new class AppStore {
  constructor() {
    const self = this;
    riot.observable(this)

    self.on(ActionTypes.ON_ROUTE_CHANGED, this.updateCurrentPage)
    self.on(ActionTypes.ON_HOME_LOADED, this.updateHomeLoaded)
    self.on(ActionTypes.ON_NAV_MENU_CLICKED, this.updateFocus)
    self.on(ActionTypes.ON_SCROLL_ON_ELEMENT, this.updateFocusScroll)
    self.on(ActionTypes.ON_MODEL_LOADED,this.updateModelLoadStatus)
  }

  updateCurrentPage(page){
    this.data.currentPage = page

    console.log("***STORE CHANGED: updateCurrentPage",page)
    RiotControl.trigger(this.ActionTypes.UPDATE_ROUTE, this.data.currentPage)
  }
  updateHomeLoaded(loaded){
    this.data.homeLoaded = loaded
    RiotControl.trigger(this.ActionTypes.UPDATE_HOME_LOADED, this.data.homeLoaded)
  }
  updateFocus(item) {
    console.log("***STORE CHANGED: updateFocus",item)
    this.data.currentPage = item
    RiotControl.trigger(this.ActionTypes.UPDATE_FOCUS, this.data.currentPage)
  }
  updateFocusScroll(item) {
    console.log("***STORE CHANGED: updateFocusScroll",item)
    this.data.currentPage = item
    RiotControl.trigger(this.ActionTypes.UPDATE_FOCUS_SCROLL, this.data.currentPage)
  }
  updateModelLoadStatus(){
    this.data.homeLoaded = true
    RiotControl.trigger(this.ActionTypes.UPDATE_HOME_LOADED, this.data.homeLoaded)
  }

}()

appStore.ActionTypes = {
  UPDATE_ROUTE: "app_route_changed",
  UPDATE_HOME_LOADED: "app_home_loaded",
  UPDATE_FOCUS: "app_focus_page_changed",
  UPDATE_FOCUS_SCROLL: "app_focus_page_changed_scroll"
}
// 動的
appStore.data = {
  currentPage: "",
  homeLoaded: false
}
// 静的
appStore.config = {
  ww: window.innerWidth, //initial value
  mode: {
    desktop: false,
    laptop: false,
    tablet: false,
    sp: false
  },

  path:{
    root: "/",
    home:"/home",
    work:"/work",
    project:"/project",
    about:"/about",
    contact:"/contact",
    article:"/article",
  },
  id:{
    home:"#home",
    work:"#work",
    project:"#project",
    about:"#about",
    contact:"#contact",
    article:"#article"
  },
  views:{
    root: "home-view",
    home:"home-view",
    work:"work-view"
  }
}

RiotControl.addStore(appStore);

export default appStore
