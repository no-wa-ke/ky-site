app-content
  
  div#main
  div#work-overlay
  
  script.
    import RiotControl from 'riotcontrol'
    import ActionTypes from '../action/app.actiontypes'
    import AppStore from '../store/app.store'
    import AppAction from '../action/app.action'
    import "./common/login.tag"
    import "./home/home.tag"
    import "./work/work.view.tag"
    

    
    

    
    
    // router
    const _mount = (tagName , option = {}) =>
    {
        let tag
        // WORK/*
        if(tagName == AppStore.config.views.work){
          tag = riot.mount('div#work-overlay' , tagName , option);          
        // HOME..
        }else{
          tag = riot.mount('div#main' , tagName , option);
        }
    		// reconnecting this mounted tag with the root
    		this.tags[tagName] = tag[0];
    		return tag;
    };
    
    this.on('mount',()=>{
      
      route("work/*",(name)=>{
        AppAction.getPost(name,()=>{
          RiotControl.trigger(ActionTypes.ON_ROUTE_CHANGED,AppStore.config.views.work)          
          _mount(AppStore.config.views.work,name)
        })
        
      })
      //ルーター（イベントリスナーも兼ねてる）
    	route((action='home') =>{   
        if(AppStore.data.homeLoaded) return
        
        
        
        console.log('route',action)        
        RiotControl.trigger(ActionTypes.ON_ROUTE_CHANGED,action)
    	    switch (action) {
            case 'signup':
            case 'signin':
              _mount('login');
              break;
    				default:
              _mount(AppStore.config.views.root);
    	    }
    	});
    
    	route.base('/') // use history api rather than #
    	route.start(true);
    
    })

    
    
