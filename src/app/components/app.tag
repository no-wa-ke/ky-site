app(role="main")
  
  app-nav(state="{globalState}")
  app-content(state="{globalState}")
  
  script.
    import riot from "riot";
  
    import './app-content.tag'
    import './app-nav.tag'
    
    this.on("mount",()=>{
      this.update({
        globalState: riot.observable({})
      });	
    })
