landing-view
  div#animated-transition
  div#model-progress  

  script.
    
    import RiotControl from "riotcontrol"
    import ActionTypes from "../../action/app.actiontypes"
    import "./landing.model-progress.tag"
    import "./animated-transition.tag"
    
    this.on('mount',()=>{
      console.log('landing-vue mounted')
      riot.mount("div#animated-transition","animated-transition",{promise:this.opts.promise})
      riot.mount("div#model-progress","model-progress")
      
    })
    
