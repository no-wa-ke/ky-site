import debounce from "debounce"
import scrollMonitor from "scrollmonitor";
import scrollToElement from "scroll-to-element"
import RiotControl from 'riotcontrol';
import AppStore from '../../store/app.store'
import ActionTypes from '../../action/app.actiontypes'


export default {

	init()
	{
		this.enableScroll = true
    this.on('mount',()=>{

			RiotControl.on(ActionTypes.ON_MODEL_LOADED,()=>{

				this.initWatcher()

			})

		})
	},

	initWatcher(){
		//- TODO: add fixed class if work-list is open
		let self = this;
		self.scrollToElem()
		.then(()=>{
			self.watchScroll()
			console.log('****watch-scroll****:: initialize watch ')
		})
		.then(()=>{

			RiotControl.on(AppStore.notify.UPDATE_FOCUS,(item)=>{self.scrollToElem(item)})
			RiotControl.on(AppStore.notify.UPDATE_ROUTE,(item)=>{self.scrollToElem(item)})
			RiotControl.trigger(ActionTypes.ON_HOME_LOADED,true)
			console.log('****watch-scroll****:: initialize watch finished')

		})
	},

  scrollToElem(el){
    return new Promise((resolve,reject)=>{
			let name = window.location.pathname
			let regex = new RegExp(/(^\/([^/]*)\/)(.*)/)
      if(!el){
				console.log('****watch-scroll****:: window name ',name)
        if(name !== "/"){
          let path;
          let target = "#"+name.replace("/","")

					if(!regex.test(name)){

						console.log("SYNC SCROLL",target)
						setTimeout(()=>{
							scrollToElement(target)
							resolve()
						},400)
					}else{

						resolve()
					}

        }else{
          resolve()
        }
      }else{

        let target = el
        console.log("ASYNC SCROLL",target)
        scrollToElement('#'+target)
        resolve()


      }

    })
  },

	disableScrollEventListener(){
		RiotControl.on(AppStore.notify.UPDATE_FOCUS,(page)=>{
			this.enableScroll = true

		})

		RiotControl.on(AppStore.notify.UPDATE_ROUTE,(page)=>{

			if(page == 'work-view'){
				this.enableScroll = false
			}else{
				this.enableScroll = true
			}

		})
	},

  watchScroll(){
    return new Promise((resolve,reject)=>{

			this.disableScrollEventListener()

      {
        const rootWatcher = scrollMonitor.create($(AppStore.config.id.home))
        rootWatcher.enterViewport(()=>{
					if(!this.enableScroll){
						return
					}

					if(AppStore.state.initial_location !== AppStore.config.path.work_page){

						RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.home)
						$("#model-view").removeClass('add-blur')

					}
        })
        rootWatcher.exitViewport(()=>{
					if(!this.enableScroll){
						return
					}

          $("#model-view").addClass('add-blur')
        })

      }

      {
        // const aboutWatcher = scrollMonitor.create($(AppStore.config.id.about), {top: -200, bottom: -300})
				//
        // aboutWatcher.enterViewport(()=>{
        //   RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.about)
        // })
        // aboutWatcher.stateChange(()=>{
        //   //- $("#about").toggleClass('fixed',aboutWatcher.isAboveViewport)
        // })


      }

      {
        const workWatcher = scrollMonitor.create($(AppStore.config.id.work), {top: -400, bottom: -200})
          workWatcher.fullyEnterViewport(()=>{
						if(!this.enableScroll){
							return
						}

            RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.work)
            //- $("#contact").removeClass('invisible')
          })
          workWatcher.enterViewport(()=>{
						if(!this.enableScroll){
							return
						}

            RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.work)
            //- $("#contact").removeClass('invisible')
          })
      }

      {
        const contactWatcher = scrollMonitor.create($(AppStore.config.id.contact),{top: -400})
        //- contactWatcher.lock()
        contactWatcher.enterViewport(()=>{
          console.log("on contact")
					if(!this.enableScroll){
						return
					}

          //- $("#about").addClass('invisible')
          RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.contact)
        })

      }
        resolve();
    })

  }


};
