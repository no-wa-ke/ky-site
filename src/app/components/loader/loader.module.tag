loader-module
  div.loader-module-container(if='{active:active}')
    div.loader-module(riot-class='{classes}')
      div.loading
      p.mt-10.text-center {text}
  
  style.
    .loader-module-container{
      position: absolute;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.36);
      z-index: 100001;
      
    }
    .extra-margin{
      margin: 50% auto;  
    } 

  script.
    
    this.active = this.opts.active    
    this.classes = this.opts.classes
    this.text = this.opts.text
    
    
    
    console.log('loaded classes',this.classes)
