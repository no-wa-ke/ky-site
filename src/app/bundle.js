import getOpts from "./components/mixins/get-opts";
import AppAction from './action/app.action'
import AppStore from './store/app.store'
import './components/app.tag'
import "./components/common/landing.tag"
// import "vconsole"



class App {

  constructor() {
    this.init();
  }
  init(){

    const landing = new Promise((resolve)=>{

      riot.mount("div#landing-view","landing-view",{promise:resolve})
    })
    const app = new Promise((resolve)=>{

      riot.mount('app',{promise:resolve})
    })

    landing
    .then(()=>app)
    .then(()=>AppAction.onresize())


  }
}

new App();
