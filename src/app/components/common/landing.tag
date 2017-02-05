landing-view
  div#animated-transition
  div#model-progress  
  script.
    import riot from "riot"
    import RiotControl from "riotcontrol"
    import ActionTypes from "../../action/app.actiontypes"
    import "./landing.model-progress.tag"
    import "./animated-transition.tag"
    
    this.on("mount",()=>{
      riot.mount("div#animated-transition","animated-transition")
      riot.mount("div#model-progress","model-progress")

    })
