home-contact#profile.ui.vertical.stripe.segment.scroll-watch
	div.ui.container
		h1(class = '{active:active}').ui.center.aligned.header.header-spacer Profile
		div(class = '{active:active}').title
			h2(class='').name KIDO YOJI
			h4.bold Music Composer | Design Engineer
			div.ui.divider
			div.history
				
				div.ui.list
					div.item
						i.icon.student
						div.content.middle.aligned
							div.description Waseda University (2009 - 2013)
							div.description Tokyo University of the Arts (2013 - 2015)

				div.ui.list
					div.item
						i.icon.building
						div.content.middle.aligned
							div.description Party,inc (2015 - )

				div.ui.list
					div.item
						i.icon.trophy
						div.content.middle.aligned
							div.description iTunes best albums of the year (2011)
							div.description CGC Judge's Award (2014)

			
			div.margin-v-20
				button(onclick='{open_profile}').ui.basic.button.transparent.border-straight
					i.search.icon 
					| View Full Profile
				
			div.ui.divider
		
		div(class = '{active:active}').sns
				a(href='https://twitter.com/kido_yoji')
					i.twitter.icon.large
				a(href='https://www.instagram.com/explore/tags/kidojamsnippet/')
					i.instagram.icon.large
				a(href='https://github.com/no-wa-ke')
					i.github.icon.large
		
				
	
	div.ui.modal
		i.close.icon
		div.header  About
		div.image.content
			div.ui.medium.image.circular
				img(src='assets/img/profile.jpg').centered.small.ui.image
			div.description
				div.ui.header KIDO YOJI | きどようじ
				p 1989年生まれ。 早稲田大学卒業後、東京藝術大学大学院映像研究科メディア映像専攻を修了。
				p 中学-高校時代にアメリカへ留学し、語学を学ぶとともに様々な音楽、表現形態に触れる
				p 帰国後は作曲家として活動し、2011年にリリースしたミニアルバム「call a romance」はiTunesエレクトロニックミュージックチャート１位にランクイン。
				p その後、作曲に使用していたソフトウェアの仕組みが気になり始め、大学院へ。映像、コンピューティングの世界に足を踏み入れる。
				p 既存のメディアをハックし、仕組自体を再構築することにより新しい体験を生み出す手法を得意とし、
				p web、CG、ハードウェア設計、展示企画まで、幅広くデザインや制作を行っている
				
	style(type='prefix').
		home-contact{
			h4{
				color:grey;
			}
			.border-straight{
		    border-radius: 0px;
			}
			.transparent{
				background: transparent;
			}
			.margin-v-20{
				margin-top: 20px;
				margin-bottom: 20px;
			}
			.history{
				margin-top:30px;
			}
			.ui.list{
				margin-top: 10px;
			}
			.ui.list>.item>i.icon {
				padding-right: 0px;
			}
			.description{
				font-size: 11px;
			}
			.header{
				transform:scale(1);
				
				transition: transform 1.2s;
				&.active{
					transform: scale(1.5);
				}
			}
			.name{
				transition: all 3s;
				opacity: 1;
				
				&.hide{
					
					opacity: 0;
				}				
			}
			.title, .sns{
				color: #333;
				transition: all 1.8s;
				transform: translateY(20%);
				opacity: 0;
				&.active{
					transform: translateY(0);
					opacity: 1;
				}
				p{
					font-size: 12px;
				}
				.bold{
					font-weight: 600;
				}
			}
			.sns{
				transition: all 2.3s;
				transform: translateY(100px);
			}
		}
	
	script.
		import RiotControl from 'riotcontrol'
		import AppStore from '../../store/app.store'
		import ActionTypes from '../../action/app.actiontypes'
		import debounce from 'debounce'
		this.active = false
		this.names = {
			jp:'きどようじ',
			en:'KIDO YOJI'
		}
		this.name = this.names.jp
		
		this.on_swap_name = false
		
		this.open_profile = ()=>{
			$('.ui.modal').modal('show');
		}
		
		this.on('mount',()=>{
			
			
			this.swap_name = ()=>{
				setTimeout(()=>{
					
					if(this.name == this.names.jp){
						$('.name').html(this.names.en)
						this.name = this.names.en
					} else{
						$('.name').html(this.names.jp)
						this.name = this.names.jp
					}
					$('.name').removeClass('hide')
					this.fade_swap()
				},3000);
			}
			
			this.fade_swap = ()=>{
				setTimeout(()=>{
					$('.name').addClass('hide')
					this.swap_name()
				},3000);
			}
			
			//- this.fade_swap()

			RiotControl.on(ActionTypes.ON_SCROLL_ON_ELEMENT,debounce((el)=>{
					if(el == AppStore.config.id.contact){
						this.active = true
					}else{
						this.active = false
					}
					this.update()
				},10))
			
			
		})
		
