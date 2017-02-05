app-nav
  div.nav-container
    div.ui.container
      div.ui.large.secondary.pointing.menu
        a(onclick="{triggerNavChange}" class="{active:activeElement == item_list.home || activeElement == item_list.root }").item Home
        a(onclick="{triggerNavChange}" class="{active:activeElement == item_list.about}").item About
        a(onclick="{triggerNavChange}" class="{active:activeElement == item_list.work || activeElement == item_list.workView}").item Work
        a(onclick="{triggerNavChange}" class="{active:activeElement == item_list.contact}").item Contact
        
        
        div(show="{filter_mode}" tabindex="0").ui.dropdown.item.right
          div.text Filter
          i.dropdown.icon
          div(tabindex="-1").menu.transition.hidden
            div.item.active All
            div.item Music
            div.item Client Work
            div.item Personal
            

  style.
    app-nav .nav-container{ 
      position: fixed;
      width:100%;
      display: block;
      background: #fff;
         
    }
  script.
    import riot from "riot"
    import RiotControl from "riotcontrol"
    import route from "riot-route"
    import ActionTypes from "../action/app.actiontypes"
    import AppStore from "../store/app.store"

    this.filter_mode = false
    this.item_list ={
      root: "/",
      home: "home",
      about: "about",
      work: "work",
      workView: "work-view",
      contact: "contact",
      article: "article",
    }
    this.activeElement
    
    this.on("mount",()=>{
      this.init();
      console.log(" app-nav reference",this)
      RiotControl.on(ActionTypes.ON_RESIZE,(mode)=>{this.updateMenuPosition(mode)})
      RiotControl.on(AppStore.ActionTypes.UPDATE_ROUTE,(item)=>{this.updateActiveElement(item)})
      RiotControl.on(AppStore.ActionTypes.UPDATE_FOCUS,(item)=>{this.updateActiveElement(item)})
      RiotControl.on(AppStore.ActionTypes.UPDATE_FOCUS_SCROLL,(item)=>{this.updateActiveElement(item)})
    })
    
    init(){
      $('.ui.dropdown').dropdown();
    }
    
    updateMenuPosition(mode){
      if(mode.sp == true){
        $(".nav-container").addClass("bottom-fixed")
      }else{
        $(".nav-container").removeClass("bottom-fixed")
      }
      
    }
    updateActiveElement(el){
      let target = el.replace("#","");
      this.activeElement = target
      if(this.activeElement == this.item_list.home|| this.activeElement == this.item_list.work || this.activeElement == this.item_list.workView){
        $(".nav-container").removeClass("hide")
      }else{
        $(".nav-container").addClass("hide")
      }
      if(this.activeElement == this.item_list.work || this.activeElement == this.item_list.workView){
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
      
      let path = "#" + e.target.text.toLowerCase()
      
      //- homeがマウントされていなければ挙動を変える
      if(!AppStore.data.homeLoaded){
        this.triggerNavChangeOnWork(path)
      }else{
        RiotControl.trigger(ActionTypes.ON_NAV_MENU_CLICKED,path)
      }
      return false;
    }
    this.triggerNavChangeOnWork = (page)=>{
      setTimeout(()=>{
        history.pushState({}, null, "/"+page.replace("#",""));
        route.exec();
      },100)
      
    }
