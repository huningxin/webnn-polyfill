import * as tf from '@tensorflow/tfjs-core';

import {ExecutionContext} from '../execution_context';
import {Operand} from '../operand_impl';
import {Operation} from '../operation';
import * as utils from '../utils';

export class Slice extends Operation {
  private starts_: number[];
  private sizes_: number[];
  private axes_: number[]|undefined;

  constructor(
      input: Operand, starts: number[], sizes: number[], axes?: number[]) {
    super([input]);
    utils.assert(
        utils.isIntegerArray(starts), 'The starts parameter is invalid.');
    this.starts_ = starts;
    utils.assert(
        utils.isIntegerArray(sizes) && sizes.every(v => v > 0 || v === -1),
        'The starts parameter is invalid.');
    this.sizes_ = sizes;
    utils.assert(
        axes === undefined || utils.isIntegerArray(axes),
        'The starts parameter is invalid.');
    this.axes_ = axes;
  }

  run(context: ExecutionContext): tf.Tensor {
    const input: tf.Tensor4D =
        this.getTensor(this.inputs[0], context) as tf.Tensor4D;
    const rank = input.shape.length;
    if (this.axes_ === undefined) {
      // assume axes is [0, 1,...r-1] if it is not defined.
      this.axes_ = [];
      for (let i = 0; i < rank; ++i) {
        this.axes_.push(i);
      }
    }
    utils.assert(
        this.axes_.every(axis => axis < rank && axis > -rank),
        'The value of axes is invalid.');
    utils.assert(
        this.starts_.length === this.axes_.length,
        'The length of starts is invalid.');
    utils.assert(
        this.sizes_.length === this.axes_.length,
        'The length of sizes is invalid.');

    const begin: number[] = new Array(this.axes_.length).fill(0);
    const size: number[] = new Array(this.axes_.length).fill(-1);
    for (let i = 0; i < this.axes_.length; ++i) {
      let axis = this.axes_[i];
      if (axis < 0) {
        axis = rank + axis;
      }
      begin[axis] = this.starts_[i];
      size[axis] = this.sizes_[i];
    }
    return tf.slice(input, begin, size);
  }
}