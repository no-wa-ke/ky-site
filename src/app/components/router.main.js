import RiotControl from 'riotcontrol'
import ActionTypes from '../action/app.actiontypes'
import AppStore from '../store/app.store'
import AppAction from '../action/app.action'

import "./common/login.tag"
import "./home/home.tag"
import "./work/work.view.tag"


class Router{

  constructor(){

    this._checkInitialPath();
    this.registerRoutes();
  }
  _checkInitialPath(){

    if(window.location.pathname.match(AppStore.config.path.work_page)){
      RiotControl.trigger(ActionTypes.ON_INITIAL_LOCATION,AppStore.config.path.work_page)
    }
  }
  _mount = (tagName , option = {}) =>
  {
    // WORK/*
    if(tagName == AppStore.config.views.work){

      riot.mount('div#work-overlay' , tagName , option);
    // HOME..
    }else{
      riot.mount('div#main' , tagName , option);
    }
  };

  registerRoutes(){

    route("work/*",(name)=>{

      AppAction.getPost(name)
      .then(()=>{
        console.log("route on work ",'workview',name)
        RiotControl.trigger(ActionTypes.ON_ROUTE_CHANGED,AppStore.config.views.work)

        if(AppStore.state.initial_location !== AppStore.config.path.work_page){
          this._mount(AppStore.config.views.work,name)
        }else{
          this._mount(AppStore.config.views.work,name);
        }


      })


    })
    //ルーター（イベントリスナーも兼ねてる）
    route((action='home') =>{
      console.log('route on home ',action)
      // if(AppStore.state.homeLoaded)return
      RiotControl.trigger(ActionTypes.ON_ROUTE_CHANGED,action)
        switch (action) {
          
          default:
            this._mount(AppStore.config.views.root);
        }
    });

    route.base('/') // use history api rather than #
    route.start(true);
  }
}

export default Router
