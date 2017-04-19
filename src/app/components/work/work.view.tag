work-view
  div#work-view.animation-before-mount
    div.ui.container.work-spacer
      div.ui.segment.reset-segment
        h1.ui.left.floated.header Header
        div.ui.clearing.divider
        img.ui.fluid.image.centered.key-visual(src="http://placehold.it/1280x720")
        div.ui.divider
        h2.ui.left.floated.header This is a sample content
        div.ui.clearing.divider
        p here is the article content
        img.ui.fluid.image.centered(src="http://placehold.it/1280x720")
        div.ui.divider
        img.ui.fluid.image.centered(src="http://placehold.it/1280x720")
        div.ui.divider
        img.ui.fluid.image.centered(src="http://placehold.it/1280x720")

  script.
    import RiotControl from "riotcontrol"
    import AppStore from "../../store/app.store"

    this.on("mount",()=>{
      
      this.animatedTransition("mount","animation-before-mount")
      this.preventScrollEvents()
      $("#work-overlay").addClass("active")
      //- Events
      {
        RiotControl.one(AppStore.ActionTypes.UPDATE_ROUTE,(page)=>{
          if(page !== AppStore.config.views.work){  
            this.animatedTransition("unmount","animation-before-mount")
          }
        })
        RiotControl.one(AppStore.ActionTypes.UPDATE_FOCUS,(page)=>{
          if(page !== AppStore.config.views.work){
            this.animatedTransition("unmount","animation-before-mount")
          }
        })
      }
    })
    //- モデルがロードされてなかったら本来のルーターにhandleさせる
    if(AppStore.data.homeLoaded){
      route("/work",()=>{
        this.animatedTransition("unmount","animation-before-mount")
      })
    }
    
    this.on("unmount",()=>{
      this.normalizeScrollEvents()      
      $("#work-overlay").removeClass("active")
    })
    
    
    animatedTransition(type,animation,time=500){
      const self = this
      if(type=="mount"){
        setTimeout(()=>{
          $("#work-view").removeClass(animation)  
        },200)
      }else if (type =="unmount"){
        $("#work-view").addClass(animation)  
        setTimeout(()=>{
          self.unmount(true)
        },time)        
      }
    }
    
    bindScroll(el){
      
      $(el).bind('mousewheel DOMMouseScroll　touchmove', function(e) {
        var scrollTo = null;
        const speed = 10;
        const speed_divider = 4

        if (e.type == 'mousewheel　|| touchmove') {
          scrollTo = (e.originalEvent.wheelDelta/speed_divider * -1);
        }
        else if (e.type == 'DOMMouseScroll') {
          scrollTo = speed * e.originalEvent.detail;
        }

        if (scrollTo) {
          e.preventDefault();
          $(this).scrollTop(scrollTo + $(this).scrollTop());
        }
      });  
      
    }
    
    this.preventScrollEvents = ()=>{
      $("body").addClass("noscroll")
      //- $(window).on('touchmove.noScroll', (e)=> {
      //-   e.preventDefault();
      //- });
    }
    this.normalizeScrollEvents = ()=>{
      $("body").removeClass("noscroll")
      $(window).off('.noScroll');
    }
    popEvent(){
      console.log("***********popstate")
      this.animatedTransition("unmount","animation-before-mount")
    }
