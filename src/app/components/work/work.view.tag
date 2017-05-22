work-view
  div#work-view.animation-before-mount
    div.ui.container.work-spacer.mobile-padding
      div.ui.segment.reset-segment
        
        div.flex-box.row.flex-centered.stack
          //- title
          div.col-8.col
            
            h3 {data.subtitle}
            h1 {data.title}
            
          //- link  
          div.col-2.col
            div.flex-box.flex-centered.column.header-links
              div.col-10.col.pad-3(each="{link in data.topLinks}").links
                a(href='{link.link}')
                  button.header-btn.ui.button.basic.secondary.col-10 {link.text}
              
        
        //- main-visual
        div.ui.clearing.divider
        marked(html='{data.customIframe}' if='{data.customIframe}')
        img.ui.fluid.image.centered.key-visual(src="{data.keyVisual.fields.file.url}" if='{!data.customIframe}')
        div.ui.divider
        
        //- genre 
        div.ui.list
          div.item
            div.header.list-header Category:
            div(each='{category in data.categories}').list-category {category}
        div.ui.clearing.divider
        
        //- article
        marked(html='{data.post}' if='{data.post}').article-content
        

  style(type='prefix').
    
    @import '../../../assets/sass/common/_media_query.scss';
    
    .w-100{width:100%;}
    .right-text{ text-align:right!important; }   
    .flex-box{ display:flex;width:100%;}
    .row{flex-direction:row;}
    .column{flex-direction:column;}
    .flex-centered{justify-content:center;align-items:center;vertical-align:middle}
    .col-8{width:80%;}
    .col-2{width:20%;}
    .col-5{width:50%;}
    .col-10{width:100%;}
    
    .links{
      @include mobile-only{
        
      }
    }

    .mobile-padding{
      @include mobile-only{
        padding-bottom:100px;
      }
    }
    
    .header-btn{
      border-radius:0px!important;
    }
    .pad-3{
      padding: 3px;
      
    }
    .header-links{
      @include mobile-only{
        flex-direction: row;
        .col{
          margin-top:20px;
          margin-bottom:20px;
          width: 40%;
        }
        }}
    .stack{
      @include mobile-only{
        flex-direction: column;
        .col{
          width: 100%;
        }
        }}

    marked{
      width:100%;
      div{
        width:100%;
      }
      iframe{
        max-width:100%!important;
      }
    }

  script.
    import WorkController from './work.view.controller'
    import AppStore from '../../store/app.store'
    
    this.mixin(WorkController)
    
    this.data = AppStore.state.posts.post[0].fields
    
    riot.tag('marked', '<div class="iframe-container"></div>', function(opts) {                                                                                                                                              
      this.on('update', function() {                                                                                                                                                             
        this.root.childNodes[0].innerHTML = opts.html;                                                                                                                                           
      }.bind(this))                                                                                                                                                                              
    })   
    
  
