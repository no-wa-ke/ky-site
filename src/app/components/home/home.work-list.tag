home-work-list
	div.ui.container.segment.stripe.vertical.scroll-watch#work
		div(class="{four:gridSize == 4,two:gridSize == 2}").ui.cards
			div(each="{post, i in posts}").ui.card
				a(onclick="{unveilWork}" ).image
					img(src="{post.fields.thumbnail.fields.file.url}")
				div.content
					div.ui.divider.thicker
					a(onclick="{unveilWork}").header {post.fields.title}
					div.ui.divider
					div.meta
						a.group {post.fields.subtitle}
	
	script.
		import riot from "riot"
		import route from "riot-route"
		import RiotControl from "riotcontrol"
		import debounce from "debounce"
		import AppAction from "../../action/app.action"
		import AppStore from "../../store/app.store"
		import ActionTypes from "../../action/app.actiontypes"
		//- import MainActionTypes from "../main.actionTypes"
		
		this.posts = []
		
		this.gridSize = 4 //default val
		
		this.on("mount",()=>{		
			const self = this
			
			RiotControl.on(ActionTypes.ON_TOP_CONTENTS_LOADED,()=>{
				this.posts = AppStore.data.posts.top
				this.update();		
			})
			//- TODO: add window resize handler
			RiotControl.on(ActionTypes.ON_SCROLL_ON_ELEMENT,(el)=>{
					debounce(this.tiltTile(2,el),10)
				})
			RiotControl.on(ActionTypes.ON_RESIZE,(size)=>{
				if(size.sp == true){
					self.gridSize = 2
				}else{
					self.gridSize = 4
				}
				self.update()
			})
		})
		
		this.tiltTile = (remainder,el)=>{
			/*
			@remainder : number of columns you want to divide up
			*/
			let _addClass = (add)=>{
				$(".ui.card").each((val,index)=>{
					if(val%remainder == 0){
						if(add){
							$(index).addClass("tile-up")
						}else{
							$(index).removeClass("tile-up")
						}
					}else if(val%remainder !== 0){
						if(add){
							$(index).addClass("tile-down")
						}else{
							$(index).removeClass("tile-down")
						}
					}
				});
			}
			if(el == "#work"){
				_addClass(true);
			}else{
				_addClass(false);
			}
		}
			
		this.unveilWork = (e)=>{

			history.pushState({}, null, "/work/"+e.item.post.fields.slug);
			route.exec()
			
		}
