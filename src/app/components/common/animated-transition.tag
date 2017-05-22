animated-transition
  div.pageload-overlay#animated-transition-overlay(data-opening='{animationType.circle.data}')
    svg(xmlns='http://www.w3.org/2000/svg', width='100%', height='100%', viewbox='0 0 80 60', preserveaspectratio='xMidYMid slice')
      path(d='{animationType.circle.path}')
  
  script.
    
    import classie from "../../util/classie.js"
    import  "../../util/svgLoader.js"
    import RiotControl from "riotcontrol"
    import ActionTypes from "../../action/app.actiontypes"
    import TransitionType from '../../animation/transition.type'
    
    window.classie = classie
    this.animationDuration = 1000
    this.animationType = TransitionType
    
    this.on("mount",()=>{
      console.log('svg transition init')
      const self = this  
      this.loader = new SVGLoader( document.getElementById( 'animated-transition-overlay' ), { speedIn : this.animationDuration, easingIn : mina.easeinout ,speedOut :this.animationDuration} );
      this.loader.show()  
      
      setTimeout(()=>{
        RiotControl.trigger(ActionTypes.ON_ANIMATED_TRANSITION_MOUNT)  
        this.opts.promise()
      },this.animationDuration)

      RiotControl.on(ActionTypes.ON_MODEL_LOADED,()=>{
        this.loader.hide(()=>{
          $("div#home-top").removeClass("invisible")
        })
      })
      
        
      
    })
    
