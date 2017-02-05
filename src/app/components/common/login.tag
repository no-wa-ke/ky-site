login
  div.container.vhcenter
    div.card-panel.indigo.lighten-5.max500
      div.row
        div.input-field.col.s12
          i.material-icons.prefix email
          input#email.validate(type='email')
          label(for='email') Email
      div.row
        div.input-field.col.s12
          i.material-icons.prefix visibility
          input#password.validate(type='password')
          label(for='password') Password
      div.row.center
        button.btn.min100.waves-effect.waves-light(type='submit', name='action') Login
        button.btn.min100.waves-effect.waves-light(type='submit', name='action') Sign up
  script.
    import riot from "riot"
  
