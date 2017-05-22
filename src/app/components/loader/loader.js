import LoaderActionType from './loader.actiontype'
import RiotControl from 'riotcontrol'
import Utils from '../../Util/utils'

import './loader.fullscreen.tag'
import './loader.spill.tag'

export default class Loader{

  constructor(){

    riot.observable(this)
    this.tagInstance = {}
    this.transitionInstance = {}
    this.text = ''
    this.initListener()
  }

  initListener(){
    this.on(LoaderActionType.show_loader,(OPTS)=>{
      if(!OPTS.target){
        this.showFullScreen(OPTS.text)
      }else{
        this.appendToElement(OPTS.target,OPTS.text,OPTS.classes)
      }
    })
    // init remove listener
    this.hide_listener = this._unmount(500);
  }


  showTransition(opts={timeout:false}){
    return new Promise((resolve,reject)=>{
      riot.mount('loader-spill',{promise:resolve,timeout:opts.timeout})
    })
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
      Util._promiseTimeout(time).then(()=>{
        console.log('LOADER UNMOUNTeD')
        this.tagInstance[0].active = false
        this.tagInstance[0].update()
        this.tagInstance[0].unmount(true)
      })
    })

  }
}
