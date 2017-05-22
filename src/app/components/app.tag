app(role="main" class='{invisible:invisible}')
  app-nav
  app-content
  style.
    app{
      display:block;
    }
    
  script.
    import './app-content.tag'
    import './app-nav.tag'
    import RiotControl from 'riotcontrol'
    import ActionType from '../action/app.actiontypes'
    import init_mixin from './mixins/init'
    
    this.invisible = true;
    
    
    this.one('mount',()=>{
      
      
      
      RiotControl.one(ActionType.ON_MODEL_LOADED,()=>{
        this.invisible = false;
        this.update()
      })
      //- riot.mixin(init_mixin)
      this.opts.promise()  
      
    })
