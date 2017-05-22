app-nav
  div.nav-container(class='{bg-white: activeElement == item_list.workView, reset-margin: reset_margin}')
    div.ui.container
      div.ui.large.secondary.pointing.menu
        virtual(each='{nav in navs}')
          a(onclick='{triggerNavChange}' class='{active: nav.ref == activeElement, hide:filter_mode || activeElement == "contact" }').item.nav-items {nav.text}
        
        
        div(class="{show:filter_mode}" tabindex="0").ui.dropdown.item.right.filter_mode
          div.text Filter
          i.dropdown.icon
          div(tabindex="-1").menu.transition.hidden
            div(each="{filter in filter_list}" onclick="{filterItems}").item {filter.text}
            

  style(type='prefix').
    app-nav{ 
      .nav-container{
        &.reset-margin{
          margin-top: 0px;
          margin-bottom: 0px;
        }
      }
      .bg-white{
        background:white!important;
      }
      .nav-container{
        position: fixed;
        width:100%;
        display: block;
        background: #fff;
      }
      .nav-items{
        opacity: 1;
        transition: all 0.4s!important;
        &.hide{
          opacity: 0;
        }        
      }
      .filter_mode{
        opacity: 0;
        transition: all 0.4s!important;
        &.show{
          opacity: 1;
        }
      }
    }
    
  script.
    import RiotControl from "riotcontrol"
    import ActionTypes from "../action/app.actiontypes"
    import AppStore from "../store/app.store"
    import AppAction from "../action/app.action"
    
    this.filter_mode = false
    this.navs = [
      {
        text: 'きどようじ',
        ref:'home',
        active: false
      },
      {
        text: 'Portfolio',
        ref:'portfolio',
        active: false
      },
      {
        text: 'Profile',
        ref:'profile',
        active: false
      }

    ]
    this.item_list ={
      root: "/",
      home: "home",
      about: "about",
      work: "portfolio",
      workView: "work-view",
      contact: "contact",
      article: "article",
    }
    this.filter_list = [
      {text:"Client",type:"client"},
      {text:"Personal",type:"personal"},
    ]
    this.activeElement
    this.reset_margin = false;
    
    this.on("mount",()=>{
      
      console.log(" app-nav reference",detector.os.name)
      
      RiotControl.on(ActionTypes.ON_RESIZE,(mode)=>{this.updateMenuPosition(mode)})
      //- RiotControl.on(AppStore.notify.UPDATE_ROUTE,(page)=>{this.updateMargin(page)})
      RiotControl.on(AppStore.notify.UPDATE_ROUTE,(item)=>{this.updateActiveElement(item)})
      RiotControl.on(AppStore.notify.UPDATE_FOCUS,(item)=>{this.updateActiveElement(item)})
      RiotControl.on(AppStore.notify.UPDATE_FOCUS_SCROLL,(item)=>{this.updateActiveElement(item)})
    
      this.init();
    })
    this.filterItems = (e)=>{
      console.log("event",e.item.filter.type)
      AppAction.getFilteredPosts(e.item.filter.type)
      
    }
    this.init= ()=>{
      if(detector.os.name == 'ios' || detector.os.name == 'android'){
        $(".nav-container").addClass("bottom-fixed")
      }
      $('.ui.dropdown').dropdown();
    }

    this.on('updated',()=>{
      if(detector.os.name == 'ios' || detector.os.name == 'android'){
        $(".nav-container").addClass("bottom-fixed")
      }
    })
    
    this.updateMargin = (page)=>{
      console.log('updating margin',page)
      if(page == 'work-view'){
        this.reset_margin = true
        this.update();
      }
    }
    
    this.updateMenuPosition = (mode)=>{
      console.log('APP NAV :: updatem menu position',mode)
      if(mode.sp == true){
        $(".nav-container").addClass("bottom-fixed")
      }else{
        $(".nav-container").removeClass("bottom-fixed")
      }
      if(detector.os.name == 'ios' || detector.os.name == 'android'){
        $(".nav-container").addClass("bottom-fixed")
      }
      
      
    }

    this.updateActiveElement = (el)=>{
      
      if(el == 'work-view'){
        this.reset_margin = true
      }else{
        this.reset_margin = false
      }
      let target = el.replace("#","");
      this.activeElement = target
      if(this.activeElement == this.item_list.home || this.activeElement == this.item_list.work || this.activeElement == this.item_list.workView){
        
        $(".nav-container").removeClass("hide")
      }else{
        
        $(".nav-container").addClass("hide")
      
      }
      if(detector.os.name == 'ios' || detector.os.name == 'android'){
        
        $(".nav-container").addClass("bottom-fixed")
      }
      
      if(this.activeElement == this.item_list.work){
        this.filter_mode = true
      }else{
        this.filter_mode = false
      }
      //- @MARK: workviewがマウントされたら基本的にurlは変えない
      if(this.activeElement !== this.item_list.workView){
        history.pushState({}, null, "/"+target);
      }
      
      
      this.update()
      
      
    }    

    this.triggerNavChange = (e)=>{
      console.log(e)
      let path = "" + e.item.nav.ref.toLowerCase()
      
      RiotControl.trigger(ActionTypes.ON_NAV_MENU_CLICKED,path)
      return false;
    }
      
