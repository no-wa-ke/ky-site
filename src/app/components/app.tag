app(role="main" class='{invisible:invisible}')
  
  app-nav
  app-content
  
  script.
    import './app-content.tag'
    import './app-nav.tag'
    
    this.invisible = true;
    this.one('mount',()=>{
      this.invisible = false;
      this.opts.promise()
      this.update()
    })
