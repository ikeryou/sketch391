import { MyDisplay } from "../core/myDisplay";
import { Func } from "../core/func";
import { Tween } from "../core/tween";
import { Conf } from "../core/conf";
import { Color } from "three";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Block extends MyDisplay {

  private _id: number
  private _inner: HTMLElement
  private _el1: HTMLElement

  public orderId: number = 0

  constructor(opt:any) {
    super(opt)

    this._id = opt.id

    // sticky要素
    const inner = document.createElement('div')
    inner.classList.add('l-block-inner')
    this.el.appendChild(inner)
    this._inner = inner

    this._el1 = document.createElement('div')
    this._el1.classList.add('l-block-el1')
    inner.appendChild(this._el1)
    this.useGPU(this._el1)

    const colA = !Util.hit(4) ? new Color(0xff0000) : new Color(0x0000ff)
    const colB = new Color(0xffff00)
    const col = colA.lerp(colB, Util.map(this._id, 0, 1, 0, Conf.NUM_IMG - 1))
    Tween.set(this._el1, {
      backgroundColor: col.getStyle(),
    })
  }


  protected _update(): void {
    super._update();

    const sw = Func.sw()
    // const sh = SvhGetter.instance.val * 1
    const sh = Func.sh()

    const it = Conf.NUM_IMG

    let w = sw / it
    let h = sh
    const blockHeight = (h / Conf.NUM_IMG) * 1

    Tween.set(this.el, {
      marginTop: sh + blockHeight * 10 * (this._id + 1),
      height: sh * 1 + blockHeight * 5 * Conf.NUM_IMG,
    })

    Tween.set(this._inner, {
      top: this._id * blockHeight,
    })

    Tween.set(this._el1, {
      width: w,
      height: sh,
      scaleX: 3,
      rotationZ: Math.sin(Util.radian(this._c * 2 + this._id * 1)) * 5,
      // rotationZ: Util.map(Math.sin(Util.radian(this._c * 5 + this._id * 1)), 1, 0.1, -1, 1),
      x: w * (this.orderId % it),
    })
  }

  protected _resize(): void {
    super._resize();
  }
}