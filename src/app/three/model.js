import "./lib/OrbitControls"
// import PerlinNoise from "../util/perlin"
import RiotControl from "riotcontrol"
import ActionTypes from "../action/app.actiontypes.js"
import AppStore from "../store/app.store"
import AltFetch from "../util/altFetch"
import Promise from "promise"
import anime from "animejs"


// ローカルのビルドがめんどいのでTHREEはcdnから呼ぶ

export default class MyModel {

  constructor(opts = {}) {
    return new Promise((resolve, reject) => {
      this.speed = 0;
      this.modelSrc = './assets/model/blender-three-without-scene2.json'
      this.self = this;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.loadingProgress = 0;
      this.output = opts.output || document.createElement('div');
      this.danceClip;
      this.backgroundColors = {
        white:"rgb(255, 255, 255)",
        yellow:"rgb(255, 255, 0)",
        cyan: "rgb(20, 220, 255)"
      }
      this.currentBackgroundColor = {
        color: this.backgroundColors.white
      }



      this.init(resolve);

    })
  }

  init(promise) {
    let self = this

      { // renderer
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        // this.renderer.setClearColor(this.currentBackgroundColor.color); // 背景色
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setSize(this.width, this.height);
        // this.renderer.shadowMap.enabled = true
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.output.appendChild(this.renderer.domElement);
      }

      this.scene = new THREE.Scene();

      { //model loader
        this.mixer;
        this.myMesh;
        this.myVerts;
        this.myGeometry;
        this.material;


        this.makeModel = (geometry,materials)=>{
          return new Promise((resolve,reject)=>{

            console.time("+++++++model load+++++++")
            materials.forEach((material) => {
              material.skinning = true;
              material.shading = THREE.FlatShading;
            });
            this.myMesh = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(
              materials));
            // mesh.rotation.y = -90 * (Math.PI / 180);
            // mesh.rotation.y = -90 * (Math.PI / 180);
            const scale = 50
            this.myMesh.scale.set(scale, scale, scale);
            this.myMesh.position.set(0, -50, 0);
            // this.myMesh.castShadow = true;
            // this.myMesh.recieveShadow = true;
            this.mixer = new THREE.AnimationMixer(this.myMesh);
            this.scene.add(this.myMesh);
            this.myGeometry = geometry;
            

            if(this.mixer){
              this.danceClip = this.mixer.clipAction(geometry.animations[0], this.myMesh)
              resolve()
              console.timeEnd("+++++++model load+++++++")

            }
          })
        }
        // THREEJSのローダーがクソなのでxhrつかってキャッシュさせてプログレス管理
        const loader = new THREE.JSONLoader();

        AltFetch.ajaxload(this.modelSrc,((e)=>{
          // make dynamic
          const totalSize = 9325173
          let stat = {
            loaded: e.loaded,
            total: totalSize
          }
          RiotControl.trigger(ActionTypes.ON_JSON_PROGRESS,stat) // step 1
        }))
        .then((e)=>{
          loader.load(
            this.modelSrc,
            (geometry, materials) => {
              this.makeModel(geometry,materials)
                .then(()=>{
                  self.beginAnimation()
                  promise()
                })
          });
        })
      }

      this.createCamera()
      this.createLights()
      // this.createFloor()


    { // helper
      // const gridHelper = new THREE.GridHelper(200,50); // size, step
      // this.scene.add(gridHelper);
      // const axisHelper = new THREE.AxisHelper(200,50);
      // this.scene.add(axisHelper);
    }

    { // controls
      this.controls = new THREE.OrbitControls(this.camera);
      this.controls.enabled = false;
      this.controls.autoRotate = true;
    }

    { //animation
      this.isPaused = false;
      this.clock = new THREE.Clock();

      this.animate = () => {
        requestAnimationFrame(this.animate);
        this.render();


      }
      this.stopAnimate = ()=>{
        this.isPaused = true;
      }

    }
    {// manager

      THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
        let stat = {
          item: item,
          loaded: loaded,
          total: total
        }

        console.log("++++on Progress: stat",stat)
        RiotControl.trigger(ActionTypes.ON_MODEL_PROGRESS,stat)

        if(loaded === total){

        }
      };
    }
    {// dispatcher
      RiotControl.on(AppStore.ActionTypes.UPDATE_FOCUS_SCROLL,(page)=>{
        if(page ==AppStore.config.id.about){
          // this.animateColor(this.backgroundColors.yellow)
        }else if (page ==AppStore.config.id.contact){
          // this.animateColor(this.backgroundColors.cyan)
        }else if (page == AppStore.config.id.home){
          // this.animateColor(this.backgroundColors.white)
        }
      })
      RiotControl.on(AppStore.ActionTypes.UPDATE_ROUTE,(page)=>{
        if(page == AppStore.config.views.work){
          this.stopAnimate()
        }else{
          this.isPaused = false
        }
      })

      RiotControl.on(AppStore.ActionTypes.UPDATE_FOCUS,(page)=>{
        if(page == AppStore.config.id.work){
          this.stopAnimate()
        }else{
          this.isPaused = false
        }
      })
      RiotControl.on(AppStore.ActionTypes.UPDATE_FOCUS_SCROLL,(page)=>{
        if(page == AppStore.config.id.work){
          this.stopAnimate()
        }else{
          this.isPaused = false
        }
      })


    }



    // メソッドをそのまま渡すと`not function`と怒られるので
    // 無名関数で囲って関数にする点に注意
    this.ww = window.innerWidth;

    window.addEventListener('resize', () => {
      let _ww = window.innerWidth;
      if (this.ww !== _ww) { //横幅が変わったら
        this.onResize();
        this.ww = window.innerWidth;
      }
    }, false);
  }

  animateColor(targetColor,_duration=2000){
    anime({
      targets: this.currentBackgroundColor,
      color:{value:targetColor}, //set actual value
      duration:_duration,
      loop: false,
      easing:"easeOutQuad",
      update:(anim)=>{
        console.log(anim)
        this.renderer.setClearColor(this.currentBackgroundColor.color); // 背景色
      }
    })
  }
  createFloor(){
    this.floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,500), new THREE.ShadowMaterial());
    this.floor.rotation.x = -Math.PI/2;
    this.floor.position.y = -50;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);
  }

  createLights(){

    const shadowLight = new THREE.SpotLight(0xdfebff,);
    shadowLight.castShadow = true;
    shadowLight.position.set(10, 50, 20);
    shadowLight.shadow.camera.near = 0.5;
    shadowLight.shadow.darkness = 0.1;
    console.log(shadowLight.shadow.camera)

    const ambientLight = new THREE.AmbientLight(0xFFFFFF);

    this.scene.add(ambientLight);
    // this.scene.add(shadowLight);


  }

  createCamera(ortho=false){

    let aspect = window.innerWidth / window.innerHeight;
    let d = 100;
    let pos;
    let myCamera;
    if(!ortho){
      myCamera = new THREE.PerspectiveCamera(45, this.width / this.height,
        1, 10000); // fov(視野角),aspect,near,far
      pos = {x:0,y:0,z:300};
    }else{
      myCamera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, -1000, 100000);
      pos = {x:20,y:20,z:20};
    }
    this.camera = myCamera
    this.camera.position.set(pos.x,pos.y,pos.z)
    this.camera.lookAt(this.scene.position);

  }
  beginAnimation(){
    this.animate()
    this.danceClip.play()
    this.renderer.domElement.id = 'model-view';

  }

  updateMixer(){
    let delta = this.clock.getDelta();
    if (this.mixer) {
      // console.log( "updating mixer by " + delta );
      this.mixer.update(delta);

    }
  }

  render() {

    if(this.isPaused) return;
    // this.turbulance(this.myGeometry.vertices)
    // this.myGeometry.verticesNeedUpdate = true;
    this.updateMixer();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

  }

  onResize() {
    console.log("on resize")

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  getNoise(xx,yy,zz){
    let n = PerlinNoise.perlin3(xx,yy,zz);
    return n;
  }
  getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
  }

  turbulance(verts){
    // this.speed = this.speed+ 0.01
    PerlinNoise.seed(Math.random());
    var OFFSET = 50;
    var time = 0.2;
    this.myGeometry.verticesNeedUpdate = true;
  	this.myGeometry.colorsNeedUpdate = true;
    for(var i=0;i<verts.length; i++){

      let vv = verts[ i ] ;

      let a = Math.sqrt(vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);

      let radX = -Math.atan2(vv.z,vv.x) + vv.y * Math.sin(0.4)*this.getRandomArbitary(0.2,1);
      let radY = Math.asin(vv.y / a) + this.getRandomArbitary(0.2,1)

      let amp = 10*a
          amp += Math.sin( 0.07)*this.getNoise(vv.x,vv.y* 0.01,vv.z)*0.8
          amp *= this.getRandomArbitary(0.5,1)

        }

	}



}
