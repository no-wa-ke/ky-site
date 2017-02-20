export default {
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
    value: new THREE.TextureLoader().load('./assets/model/blender-three-without-scene2.json')
  },
  valid_tex: {
    type: 'f',
    value: 1
  }

}
