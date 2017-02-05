home-view
	home-top
	home-container
	
	script.
		import riot from 'riot';
		import debounce from "debounce"
		import scrollMonitor from "scrollmonitor";
		import scrollToElement from "scroll-to-element"
		import RiotControl from 'riotcontrol';
		import AppStore from '../../store/app.store'
		import ActionTypes from '../../action/app.actiontypes'
		
		import "./home.top.tag"
		import "./home.container.tag"

		
		this.on('mount',()=>{
			//- TODO: add fixed class if work-list is open
			let self = this;
			RiotControl.one(ActionTypes.ON_MODEL_LOADED,()=>{	
				self.scrollToElem()
				.then(()=>{
					self.watchScroll()
				})
				.then(()=>{
					RiotControl.trigger(ActionTypes.ON_HOME_LOADED,true)
					RiotControl.on(AppStore.ActionTypes.UPDATE_FOCUS,(item)=>{self.scrollToElem(item)})
					RiotControl.on(AppStore.ActionTypes.UPDATE_ROUTE,(item)=>{self.scrollToElem(item)})
					
				})				
			})
		})
		
		this.on("unmount",()=>{
			this.off("*")
		})

		scrollToElem(el){			
			return new Promise((resolve,reject)=>{
				if(!el){
					
					let name = window.location.pathname
					if(name !== "/"){				
						let path;
						let target = "#"+window.location.pathname.replace("/","")
						console.log("SYNC SCROLL",target)
						
						
						setTimeout(()=>{
							scrollToElement(target)
							resolve()
						},400)
						
					}else{
						resolve()
					}
				}else{
					
					let target = el
					console.log("ASYNC SCROLL",target)
					scrollToElement(target)
					resolve()
					
					
				}
				
			})
		}
		
		watchScroll(){
			return new Promise((resolve,reject)=>{
				{
					const rootWatcher = scrollMonitor.create($(AppStore.config.id.home))
					rootWatcher.enterViewport(()=>{
						//- DOMのタグ形式で呼ぶ。最終的な名前は合わせる
						RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.home)
						$("#model-view").removeClass('add-blur')
					})
					rootWatcher.exitViewport(()=>{
						$("#model-view").addClass('add-blur')
					})

				}
				
				{
					const aboutWatcher = scrollMonitor.create($(AppStore.config.id.about))

					aboutWatcher.enterViewport(()=>{
						RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.about)
					})
					aboutWatcher.stateChange(()=>{
						//- $("#about").toggleClass('fixed',aboutWatcher.isAboveViewport)
					})
					
					
				}
				
				{
					const workWatcher = scrollMonitor.create($(AppStore.config.id.work))
					workWatcher.fullyEnterViewport(()=>{
						RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.work)
						
						//- $("#contact").removeClass('invisible')
					})
				}
				
				{
					const contactWatcher = scrollMonitor.create($(AppStore.config.id.contact),100)			
					//- contactWatcher.lock()
					contactWatcher.enterViewport(()=>{
						console.log("on contact")
						//- $("#about").addClass('invisible')
						RiotControl.trigger(ActionTypes.ON_SCROLL_ON_ELEMENT,AppStore.config.id.contact)
					})
					contactWatcher.stateChange(()=>{
						//- $("#contact").toggleClass('fixed',contactWatcher.isAboveViewport)
					})					
					contactWatcher.partiallyExitViewport(()=>{
						//- $("#about").removeClass('invisible')
					})
				}
					resolve();
			})

		}
		

			
