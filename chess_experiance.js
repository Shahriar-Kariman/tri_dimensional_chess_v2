import * as THREE from 'three'
import { board } from './board'

// scene
const scene = new THREE.Scene()

// lights
const lights = new THREE.Group()

const ambientLight = new THREE.AmbientLight()
ambientLight.name = "amb_light"
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.name = "dir_light"
directionalLight.position.y = 2

lights.add(ambientLight,directionalLight)
scene.add(lights)

// custom geometry (stars)
const stars_geometry = new THREE.BufferGeometry()
const star_count = 1400

const star_positions = new Float32Array(star_count * 3)

const stars_geometry_radius = 70

for(let i = 0; i < star_count*3; i+=3){
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2*v-1)
  star_positions[i] = stars_geometry_radius * Math.sin(phi) * Math.cos(theta)
  star_positions[i+1] = stars_geometry_radius * Math.sin(phi) * Math.sin(theta)
  star_positions[i+2] = stars_geometry_radius * Math.cos(phi)
}

stars_geometry.setAttribute('position', new THREE.BufferAttribute(star_positions, 3))

const stars_material = new THREE.PointsMaterial()
stars_material.size = 0.2
stars_material.sizeAttenuation = true

const stars = new THREE.Points(stars_geometry, stars_material)
stars.name = "stars"
scene.add(stars)

// main boards

const b3 = new board('b',4,5) // black board
const b2 = new board('n',4,3) // neutral board
const b1 = new board('w',4,1) // white board

// axis helper
const axesHelper = new THREE.AxesHelper(5);
scene.add( axesHelper );

export {
  scene,
}