app-content
  div#landing-view
  div#main
  div#work-overlay
  
  script.
    import riot from 'riot'
    import route from 'riot-route'
    import RiotControl from 'riotcontrol'
    import ActionTypes from '../action/app.actiontypes'
    import AppStore from '../store/app.store'
    import "./common/login.tag"
    import "./home/home.tag"
    import "./work/work.view.tag"
    import "./common/landing.tag"
    
    
    
    const _mount = (tagName , option = {}) =>
    {
        let tag
        if(tagName == AppStore.config.views.work){
          tag = riot.mount('div#work-overlay' , tagName , option);
          console.log("on /*/ work-view",option)        
        }else{
          tag = riot.mount('div#main' , tagName , option);
          console.log("on / home-view",option)        
        }
    		// reconnecting this mounted tag with the root
    		this.tags[tagName] = tag[0];
    		return tag;
    };
    
    this.on('mount',()=>{
      
      route("work/*",(name)=>{
        console.log("ROUTER: WORK")
        opts.state.trigger('route:changed' , name);
        RiotControl.trigger(ActionTypes.ON_ROUTE_CHANGED,AppStore.config.views.work)
        _mount(AppStore.config.views.work,name)
      })
      //ルーター（イベントリスナーも兼ねてる）
    	route((action='home') =>
    {   if(AppStore.data.homeLoaded) return
        console.log("ROUTER: NORMAL")
    		opts.state.trigger('route:changed' , action);
        
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

    
    
