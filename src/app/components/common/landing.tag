landing-view
  div#animated-transition
  div#model-progress  

  style.
    
  script.
    
    import RiotControl from "riotcontrol"
    import ActionTypes from "../../action/app.actiontypes"
    import "./landing.model-progress.tag"
    import "./animated-transition.tag"
    
    this.on('mount',()=>{
      
      console.log('landing-vie mounted')
      riot.mount("div#animated-transition","animated-transition")
      riot.mount("div#model-progress","model-progress")
      this.opts.promise()
      
    })
    
