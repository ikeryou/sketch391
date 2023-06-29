import { MyDisplay } from "../core/myDisplay";
import { Block } from "./block";
import { Conf } from "../core/conf";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _block:Array<Block> = []

  constructor(opt:any) {
    super(opt)

    const num = Conf.NUM_IMG
    for(let i = 0; i < num; i++) {
      const block = document.createElement('div')
      block.classList.add('l-block')
      this.el.appendChild(block)

      this._block.push(new Block({
        el: block,
        id: i
      }))
    }

    Util.shuffle(this._block)
    this._block.forEach((block, i) => {
      block.orderId = i
    })
  }


  protected _update(): void {
    super._update();
  }

  protected _resize(): void {
    super._resize();
  }
}