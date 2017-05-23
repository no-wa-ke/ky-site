import AppStore from "../../store/app.store"

import RiotControl from 'riotcontrol'
import Loader from '../loader/loader'
import Router from '../router'
import Utils from '../../util/utils.js'
export default {

	init()
	{

    this.loader = new Loader()

		this.on('mount',()=>{
			const self = this;

			this.preventScrollEvents()
			$("#work-overlay").addClass("active")
			//- Events
      {
        RiotControl.one(AppStore.notify.UPDATE_ROUTE,(page)=>{
          if(page !== AppStore.config.views.work){
            this.animatedTransition()
          }
        })

        RiotControl.one(AppStore.notify.UPDATE_FOCUS,(page)=>{
          if(page !== AppStore.config.views.work){
            this.animatedTransition()
          }
        })
      }
			this.update()
    })

		this.on('updated',()=>{
			this.getExternalScripts()
		})

    this.one("unmount",()=>{
      this.normalizeScrollEvents()
      $("#work-overlay").removeClass("active")
    })

    this.popEvent=()=>{
			this.animatedTransition()
    }

	},

	getExternalScripts(){


		let $allTarget =  $('iframe[src*="youtube.com"],blockquote.instagram-media,iframe[src*="vimeo"]');

		if($allTarget.length == 0	){
			return;
		}

		this.setIframeResponsive('.iframe-container',$allTarget)

		$.getScript( window.location.protocol + "//platform.instagram.com/en_US/embeds.js",()=>{
			console.log('****LOAD external script :: loading scripts')
				instgrm.Embeds.process()
		})

	},

	setIframeResponsive(body='body',$elements){

			// Find all YouTube videos
			let $allVideos =  $elements,
			// The element that is fluid width
			$fluidEl = $(body);
			console.log('YOUTUBE',$allVideos,$fluidEl)
			if(!$allVideos){
				return reject
			}
			// Figure out and save aspect ratio for each video
			$allVideos.each(function() {
				console.log(this)
				$(this)
				.data('aspectRatio', this.height / this.width)
				// and remove the hard coded width/height
				.removeAttr('height')
				.removeAttr('width');

			});

			// When the window is resized
			$(window).resize(function() {
				var newWidth = $fluidEl.width();

				// Resize all videos according to their own aspect ratio
				$allVideos.each(function() {

					var $el = $(this);
					$el
					.width(newWidth)
					.height(newWidth * $el.data('aspectRatio'));


				});

				// Kick off one resize to fix all videos on page load
			}).resize();


	},


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

  },

  animatedTransition(){

    this.loader.showTransition({timeout:true})
    .then(()=>{this.unmount(true)})

  },

  preventScrollEvents(){
    $("body").addClass("noscroll")

  },
  normalizeScrollEvents(){
    $("body").removeClass("noscroll")
    $(window).off('.noScroll');
  },

  log(msg=[]){
    console.info('--WORKCONTROLLER--',msg)
  }


};
