import getOpts from "./components/mixins/get-opts";
import AppAction from './action/app.action'
import ActionTypes from './action/app.actiontypes'
import AppStore from './store/app.store'
import MyModel from "./three/model"
import RiotControl from 'riotcontrol'
import './components/app.tag'
import './components/work/work.tag'
import "./components/common/landing.tag"
// import "vconsole"



class App {

  constructor() {

    this.mount_landing = ()=>{
      return new Promise((resolve)=>{
        riot.mount("div#landing-view","landing-view",{promise:resolve}) // to animated-transition.tag
      })
    }
    this.mount_app = ()=>{
      return new Promise((resolve)=>{
        riot.mount('app',{promise:resolve}) //to app.tag
        riot.mount('work') //to app.tag
      })
    }
    this.load_model = ()=>{
      return new MyModel({
        output: document.getElementById('home-top'),
      })
    }

    this.init();

  }

  init(){

    this.mount_landing()

    .then(()=>this.mount_app())
    .then(()=>this.load_model())
    .then(()=>{
      RiotControl.trigger(ActionTypes.ON_MODEL_LOADED)
      AppAction.onresize()
      AppAction.getAllPosts();

    })


  }
}

new App();
