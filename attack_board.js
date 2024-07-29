import * as THREE from 'three'
import { assign_translate } from './board'

class attack_board{
  constructor(corner_square, is_up, original_owner){
    this.square_list = []
    this.squares = new THREE.Group()
    this.corner_square = corner_square // this is a corner square from a fixed board
    this.original_owner = original_owner // ture for white false for black
    const board_code = corner_square.board.toLowerCase().charCodeAt(0)
    this.translate = assign_translate(board_code)
    this.is_up = is_up
  }
  make_board(is_forward, is_right, parent_color){
    let f_factor = is_forward ? 1 : -1
    let r_factor = is_right ? 1 : -1
    let u_factor = this.is_up ? 1 : -1
    // to be continude...
  }
}