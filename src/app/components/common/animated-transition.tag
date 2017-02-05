animated-transition
  div.pageload-overlay#aniamted-transition-overlay(data-opening='{animationType.circle.data}')
  
    svg(xmlns='http://www.w3.org/2000/svg', width='100%', height='100%', viewbox='0 0 80 60', preserveaspectratio='xMidYMid slice')
      path(d='{animationType.circle.path}')
  
  script.
    import riot from "riot"
    import classie from "../../util/classie.js"
    import  "../../util/svgLoader.js"
    import RiotControl from "riotcontrol"
    import ActionTypes from "../../action/app.actiontypes"
    
    window.classie = classie
    this.animationDuration = 600
    this.animationType = {
      circle: {
        data:"M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z",
        path:"M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z"
      }
    }
    
    
    this.on("mount",()=>{
      const self = this  
      this.loader = new SVGLoader( document.getElementById( 'aniamted-transition-overlay' ), { speedIn : this.animationDuration, easingIn : mina.easeinout ,speedOut :this.animationDuration} );
      this.loader.show()  
      
      setTimeout(()=>{
        RiotControl.trigger(ActionTypes.ON_ANIMATED_TRANSITION_MOUNT)  
      },this.animationDuration)

      RiotControl.on(ActionTypes.ON_MODEL_LOADED,()=>{
        this.loader.hide(()=>{
          $("#home-top").removeClass("invisible")
        })
      })
      
        
      
    })
    
