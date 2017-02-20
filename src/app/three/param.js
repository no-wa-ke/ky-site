const modelParams = new class ModelParams {
	
	constructor() {

		this.scale = 100;
		this.radius = 1;
		this.noise_a = 0.03;
		this.noise_x = 3;
		this.noise_y = 7;
		this.noise_z = 1;
		this.noise_i = 55;
		this.plane_noise_a = 3;
		this.plane_noise_z = 3;
		this.plane_noise_y = 3;
		this.plane = false;
		this.texture = true;
		this.time = 1;
	  this.uniforms = 
			{
			time: {
			type: 'f',
			value: 0
			},
			ease_time: {
			type: 'f',
			value: 0
			},
			ease_time_max: {
			type: 'f',
			value: 1
			},
			radius: {
			type: 'f',
			value: this.radius
			},
			noise_a: {
			type: 'f',
			value: this.noise_a
			},
			noise_i: {
			type: 'f',
			value: this.noise_i
			},
			noise_x: {
			type: 'f',
			value: this.noise_x
			},
			noise_y: {
			type: 'f',
			value: this.noise_y
			},
			noise_z: {
			type: 'f',
			value: this.noise_z
			},
			plane_noise_a: {
			type: 'f',
			value: this.plane_noise_a
			},
			plane_noise_z: {
			type: 'f',
			value: this.plane_noise_z
			},
			plane_noise_y: {
			type: 'f',
			value: this.plane_noise_y
			},
			texture: {
			type: 't',
			value: new THREE.TextureLoader().load('./assets/model/originalSurface_Color.jpg')
			},
			valid_tex: {
			type: 'f',
			value: 1
			},
			resolution:{
			type:"v2",
			value: new THREE.Vector2()
			}
			}
		// code
	}
	// methods
}
export default modelParams