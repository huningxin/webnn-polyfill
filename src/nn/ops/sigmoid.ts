import * as tf from '@tensorflow/tfjs-core';

import {Operand} from '../operand_impl';
import {Unary} from './unary';

export class Sigmoid extends Unary {
  constructor(x: Operand) {
    super(x);
  }

  runOp(x: tf.Tensor): tf.Tensor {
    return tf.sigmoid(x);
  }
}