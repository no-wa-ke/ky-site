home-view
	home-top
	home-container
	
	script.
		
		import WatchScroll from './watch-scroll'
		
		import "./home.top.tag"
		import "./home.container.tag"
		
		this.mixin(WatchScroll)
		
		
		this.on("unmount",()=>{
			this.off("*")
		})

		

			
