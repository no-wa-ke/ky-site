loader-spill
  div.pageload-overlay#work-transition-overlay(data-opening='{animationType.spill.data}').work
    svg(xmlns='http://www.w3.org/2000/svg', width='100%', height='100%', viewbox='0 0 80 60', preserveaspectratio='xMidYMid slice')
      path(d='{animationType.spill.path}')
  div.loader-container
    div.ui.transparent
      div.ui.active.loader.transparent
  
  style(type='prefix').
    
    loader-spill{
      pointer-events:none;
      position: fixed;
      top: 0;
      left: 0;
      display:block;
      z-index: 10000000;
      width: 100%;
      height:100%;
    }
    
    .loader-container{
      opacity:0;
      position:absolute;
      z-index: 100000001;
      width:100%;
      height: 100%;
      display:flex;
      justify-content:center;
      align-items:center; 
      vertical-align:middle;
      background:transparent;
      transition: opacity 0.4s;
      &.active{
        opacity: 1;
      }
    }
    
    .transparent{
      background:transparent!important;
      border: transparent 0px solid !important;
      box-shadow:0px!important
    }
    
  script.
    import classie from "../../util/classie"
    import  "../../util/svgLoader"
    import Utils from  "../../util/utils"
    import LoaderActionType from './loader.actiontype'
    import RiotControl from "riotcontrol"
    import ActionTypes from "./loader.actiontype"
    import TransitionType from '../../animation/transition.type'
    import AppActionTypes from '../../action/app.actiontypes'

    window.classie = classie
    this.animationDuration = 1000
    this.animationType = TransitionType
    this.on_mount = false;
    
    this.on("mount",()=>{
      
      
      this.loader = new SVGLoader( document.getElementById( 'work-transition-overlay' ), { speedIn : this.animationDuration, easingIn : mina.easeinout ,speedOut :this.animationDuration} );
      this.loader.show()

      Utils._promiseTimeout(this.animationDuration).then(()=>{
      
        RiotControl.trigger(ActionTypes.ON_WORK_TRANSITION_COMPLETE)  
      
        this.opts.promise()
      
        $('.loader-container').removeClass('active')

        if(this.opts.timeout){
          this.loader.hide(()=>{
            this.unmount(true)
          })  
        }
        
      })
      
      RiotControl.on(AppActionTypes.ON_POST_CONTENT_LOADED,()=>{
        this.loader.hide(()=>{
          RiotControl.trigger(LoaderActionType.ON_LOADER_UNMOUNT)
          this.unmount(true)
        })
      })
      
      Utils._promiseTimeout(200).then(()=>{
        $('.loader-container').addClass('active')  
      })
    })
