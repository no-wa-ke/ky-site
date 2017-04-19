import LoaderActionType from './loader.actiontype'
import RiotControl from 'riotcontrol'
import util from '../../Util/util'
import _ from 'lodash'

import './loader.fullscreen.tag'
import './loader.transition.tag'

export default class Loader{
  constructor(){

    riot.observable(this)
    this.tagInstance
    this.text = ''

    this.on(LoaderActionType.show_loader,(OPTS)=>{

      if(!OPTS.target){
        this.showFullScreen(OPTS.text)
      }else{
        this.appendToElement(OPTS.target,OPTS.text,OPTS.classes)
      }
    })
    // init remove listener
    this.hide_listener = this._unmount(500)

  }

  showFullScreen(text=''){
    this.tagInstance = riot.mount('loader',{text:text,active:true,hide:this.hide_listener})

    // document.getElementsbyTagName('app')[0].appendChild(loader)

  }
  /**
  * comment
  * @param {target} string
  * @param {text} string
  * @param {classses} obj // custom style of module
  */

  appendToElement(target='',text='',classes={}){

    this.tagInstance = riot.mount(target,'loader-module',{text:text,active:true,classes:classes,hide:this.hide_listener})

  }

  _unmount(time=500){

    this.on(LoaderActionType.hide_loader,()=>{
      util._promiseTimeout(time).then(()=>{
        this.tagInstance[0].active = false
        this.tagInstance[0].update()
        this.tagInstance[0].unmount(true)
      })
    })

  }
}
