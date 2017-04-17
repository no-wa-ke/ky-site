home-top
	//- div.gradient
	div#home-top.invisible
	
	style.

	script.
		import riot from "riot"
		import MyModel from "../../three/model"
		import domready from 'domready'
		import RiotControl from "riotcontrol"
		import ActionTypes from "../../action/app.actiontypes.js"
		import AppStore from "../../store/app.store"
		import AppAction from "../../action/app.action"
		 		
		this.on("mount",()=>{
			
			riot.mount("div#landing-view","landing-view")
			
			RiotControl.on(ActionTypes.ON_ANIMATED_TRANSITION_MOUNT,()=>{	
				const myModel = new MyModel({
					output: document.getElementById('home-top')
				}).then(()=>{
					
					this.init()
				});				
			})
		})
		init(){
			RiotControl.trigger(ActionTypes.ON_MODEL_LOADED)
			AppAction.getAllPosts();
		}
