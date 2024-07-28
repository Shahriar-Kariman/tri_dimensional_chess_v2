import * as THREE from 'three'
import { corner_square, square } from './square'
import { black_square_material, square_geometry, translate, white_square_material } from './gloabal'

const neutral_translate = (col,row)=>{
  row-=3
  let {x,z} = translate(col,row)
  let y = 0
  return {x,z,y}
}
const black_translate = (col,row)=>{
  let {x,z} = translate(col,row)
  z += 3
  let y = 3
  return {x,z,y}
}
const white_translate = (col,row)=>{
  let {x,z} = translate(col,row)
  z += 3
  let y = -3
  return {x,z,y}
}

class board{
  constructor(board, size, start_row){
    this.square_list = []
    this.squares = new THREE.Group()
    this.corner_squares = []
    let board_code = board.toLowerCase().charCodeAt(0)
    if(board_code==='w'.charCodeAt(0)){
      this.translate = white_translate
    }
    else if(board_code==='b'.charCodeAt(0)){
      this.translate = black_translate
    }
    else {
      this.translate = neutral_translate
    }
    this.make_squares(board, size, start_row)
  }
  make_squares(board, size, start_row){
    const row_increment = start_row
    for(let col = 0, isStartLight = false; col < size; col++, isStartLight = !isStartLight){
      let column = String.fromCharCode(col+97)
      let obj
      for(let r = 0+row_increment, is_light = isStartLight; r<size+row_increment; r++, is_light = !is_light){
        is_light ?
          obj = new THREE.Mesh(square_geometry, white_square_material)
          :
          obj = new THREE.Mesh(square_geometry, black_square_material)
        let s = null
        if(
          (col===0 || col===size-1)
          &&
          (r===row_increment || r===size+row_increment-1)
        ){
          s = new corner_square(
            column, r, is_light, obj, this.translate, board,
            r===row_increment ? false : true,
            col===0 ? false : true
            // I know I could just negate the result but it is easer to undestand it this way
          )
        }
        else {
          s = new square(column, r, is_light, obj, this.translate)
        }
        this.square_list.push(s)
        this.squares.add(s.object)
      }
    }
  }
}

export {
  board
}