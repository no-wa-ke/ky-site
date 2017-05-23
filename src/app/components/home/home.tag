home-view
	home-top
	home-container(class='{stop:stop}')
	
	style(type='prefix').
		
			.stop{
				display:none;
				
				pointer-events:none;
				touch-action: none;
				
				z-index:-1000;
			}
		
	script.
		import RiotControl from 'riotcontrol'
		import WatchScroll from './watch-scroll'
		import AppStore from '../../store/app.store'
		import LoaderActionType from '../loader/loader.actiontype'
		
		import "./home.top.tag"
		import "./home.container.tag"
		
		this.mixin(WatchScroll)
		this.stop = false
		const self = this
		
		RiotControl.on(AppStore.notify.UPDATE_FOCUS,(page)=>{
			this.stop = false
			this.update()
		})
		
		RiotControl.on(AppStore.notify.UPDATE_ROUTE,(page)=>{
			
			if(page == 'work-view'){
				self.stop = true
			}else{
				self.stop = false
			}
			let that = self
			
		})
		RiotControl.on(LoaderActionType.ON_LOADER_UNMOUNT,()=>{
			console.log('LOADER UNMOUNTeD',self.stop)
			if(self.stop){
				//- this.update()
			}			
		})
		this.on("unmount",()=>{
			this.off("*")
		})

		

			
