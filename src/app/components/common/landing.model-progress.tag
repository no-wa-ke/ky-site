model-progress
  div.percentage
    svg#progress(version='1.1', xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink', viewbox='0 0 130 130', overflow='visible', enable-background='new 0 0 130 130')
      circle(fill='none', stroke='#000000', stroke-width='4', stroke-miterlimit='10', cx='64.8', cy='64.8', r='59.8')
      circle.styled(fill='none', stroke='#000000', stroke-width='4', stroke-miterlimit='10', cx='64.8', cy='64.8', r='59.8')    
  p#progress-text.percentage-text {percentage}%

  script.
    import riot from "riot"
    import RiotControl from "riotcontrol"
    import ActionTypes from "../../action/app.actiontypes"
    
    this.percentage = 0
    this.lastPercentage = 0
    this.fakePercentage = 0
    this.stat = {}
    
    this.on("mount",()=>{
        console.log("MODEL-PROGRESS MOUNTED")

      RiotControl.on(ActionTypes.ON_JSON_PROGRESS,(stat)=>{
          console.log("JSON PROGRESS",stat.loaded,stat.total)
          this.percentage = Math.floor( 100 * (stat.loaded/stat.total) ) 
          this.stat = stat
          this.update()
        })  

      RiotControl.on(ActionTypes.ON_MODEL_PROGRESS,(stat)=>{
        //- this.percentage = Math.floor( 100 * (stat.loaded/stat.total) )
        //- this.stat = stat
        //- this.update()
      })  
      
      RiotControl.on(ActionTypes.ON_MODEL_LOADED,()=>{
        let self = this
        document.getElementById('progress').classList.add('complete'); 
        document.getElementById('progress-text').classList.add('complete'); 
        console.log("MODEL-LOAD.tag: model loaded ")
        this.update()
        setTimeout(()=>{
          self.unmount(true)
        },400)
      })  

      this._loadingProgress()
    })

    _loadingProgress(){  
      
      let self = this
      let paths = document.getElementsByClassName('styled');
      let path = paths[paths.length-1];
      let length = path.r.baseVal.value * 2 * Math.PI;

      $(path).css({
        'stroke-dasharray': length,
        'stroke-dashoffset': 0,
        'opacity': 1,
        
      })

      
      this.loadingInterval = setInterval(()=>{
        //- animate
        $(path).css({
          
          'stroke-dashoffset':length-(self.percentage/100)*length,
        })
          if(self.percentage>=100){ clearInterval(self.loadingInterval)}
          this.update()
        },10)
        
    }
    
