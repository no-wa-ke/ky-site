model-progress
  div.percentage
    svg#progress(version='1.1', xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink', viewbox='0 0 130 130', overflow='visible', enable-background='new 0 0 130 130')
      circle(fill='none', stroke='none', stroke-width='4', stroke-miterlimit='10', cx='64.8', cy='64.8', r='59.8').bg-grad
      circle.circle-styled(fill='none', stroke='none', stroke-width='4', stroke-miterlimit='10', cx='64.8', cy='64.8', r='59.8')    
  p#progress-text.percentage-text {percentage}%

  script.
    
    import RiotControl from "riotcontrol"
    import ActionTypes from "../../action/app.actiontypes"
    
    this.unmountDuration = 400
    this.percentage = 0
    this.percentage_text = 0
    this.percentage_api = 0
    this.lastPercentage = 0
    this.fakePercentage = 0
    this.stat = {}
    
    this.on("mount",()=>{
      
      //- event from @ model.js
      RiotControl.on(ActionTypes.ON_TOP_CONTENTS_LOADED,()=>{
          
      })
      
      RiotControl.on(ActionTypes.ON_JSON_PROGRESS,(stat)=>{
          
        let progress =  Math.floor( 100 * (stat.loaded/stat.total) )
        console.log("JSON PROGRESS",stat.loaded,stat.total,progress)
        this.percentage =  progress
        this.stat = stat
        this.update()
      })  

      RiotControl.on(ActionTypes.ON_MODEL_PROGRESS,(stat)=>{      
        console.log("MODEL PROGRESS",stat)
        
      
      })  
      
      
      //- event from @ model.js
      RiotControl.on(ActionTypes.ON_MODEL_LOADED,()=>{
      
        let self = this
        
        document.getElementById('progress').classList.add('complete'); 
        document.getElementById('progress-text').classList.add('complete'); 
        this.update()
        
        setTimeout(()=>{
          self.unmount(true)
        },this.unmountDuration)

      })  
      
      this._loadingProgress()
    })

    this._loadingProgress=()=>{  
      
      let self = this
      let paths = document.getElementsByClassName('circle-styled');
      let path = paths[paths.length-1];
      let length = path.r.baseVal.value * 2 * Math.PI;
      
      $(path).css({
        'stroke-dasharray': length,
        'stroke-dashoffset': length-(self.percentage/100)*length,
        'opacity': 1,
      })

      this.loadingInterval = setInterval(()=>{
        
        //- animate
        $(path).css({
          'stroke-dashoffset':length-(self.percentage/100)*length,
        })
          if(self.percentage>=100){ clearInterval(self.loadingInterval)}
          
          this.update()
        },100)
        
    }
    
