import getOpts from "./components/mixins/get-opts";
import riot from 'riot'
import route from 'riot-route'
import AppAction from './action/app.action'
import './components/app.tag'

// import "vconsole"



class App {

  constructor() {
    riot.mixin('getOpts', getOpts);
    riot.mount('app')
    AppAction.onresize()
  }

}

new App();
