loader
  div(ref='modal' class='{active:active}').modal.top-layer
    div.modal-overlay
    div(ref='container').modal-container.rounded
      div.loading.mt-10
      div.mt-10
        p {opts.text}

  style.
      
    .modal-container{
      background: rgba(255, 255, 255, 0.63);
      border-radius: 4rem;
      display: block;
      padding: 30px 30px 10px 30px;
      text-align: center;
    }

  script.
    
    this.active = this.opts.active
    
    
    
    
  
    
    
    
