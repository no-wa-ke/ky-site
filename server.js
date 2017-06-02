"use strict";


import express from 'express'
import path from 'path'
import ApiInterface from './server/apiInterface'
import AppStore from './server/store'

const	rootDir = __dirname + '/build'
	,port 	= 3000
        ,app = express();

const apiInterface = new ApiInterface()

let meta = {}

app.use(express.static(__dirname + '/build'));

app.set('views', path.join(__dirname, '/build'));
app.set('view engine', 'pug');

app.get('/portfolio/:query', function (req, res) {

  apiInterface.getPost(req.params.query).then(()=>{
    if(AppStore.state.posts){
    meta.OG_TITLE = "Kido Yoji`s Portfolio - " + AppStore.state.posts[0].fields.title;

    meta.OG_DESCRIPTION =  AppStore.state.posts[0].fields.subtitle;

    if(!AppStore.state.posts[0].fields.keyVisual){
      meta.OG_IMAGE = req.protocol +":"+ AppStore.state.posts[0].fields.thumbnail.fields.file.url
    }else{
      meta.OG_IMAGE = req.protocol  +":"+ AppStore.state.posts[0].fields.keyVisual.fields.file.url
    }
    meta.CURRENT_URL = req.protocol + '//kidoyoji.xyz/portfolio/' + req.params[0];
    }
    res.render('index',{meta:meta})
    })

})


app.get('/*', function (req, res) {
    res.render('index',{meta:meta})
})


// app.use(fallback('index.html', { root: rootDir }))

app.listen(port);


//===================
console.log('Serving files from: '+rootDir)
console.log('Press Ctrl + C to stop.');
