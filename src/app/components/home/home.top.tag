home-top

	div#home-top.invisible


	style(type='prefix').
		home-top{
			position:fixed;
			.container{
				width:100%;
				height:100%;
				display:flex;
				position:fixed;
				justify-content:center;
				align-items:center;
				.bg-white-card{
					border-radius: 2px;
					background: white;
				}
			}
		}
	script.
		import debounce from 'debounce'
		
		this.margin = 100;
		
		this.size = {
			x:window.innerWidth,
			y:window.innerHeight
		}
		
		this.style= {
			width: this.size.x- this.margin +'px',
			height: this.size.y - this.margin+'px'
		}
		
		this.resize = ()=>{
			
			if(detector.os.name == 'ios'){
				if (this.size.x == window.innerWidth) {
					return;
				}
			}
			console.log(this.size.x,this.size.y)
			this.style.width = window.innerWidth -this.margin+'px'
			this.style.height = window.innerHeight - this.margin+'px'
			this.update()
		}
		
		this.on('mount',()=>{
			
			let self = this
			$(window).on('resize', debounce(()=>{
				self.resize()
			},100))
	
			
		})
		
