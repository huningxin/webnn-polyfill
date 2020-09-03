import * as tf from '@tensorflow/tfjs-core';

import {Constant} from './Constant';
import {ExecutionContext} from './ExecutionContext';
import {Input} from './Input';
import {Operand} from './OperandImpl';
import {Output} from './Output';
import * as utils from './utils';

export abstract class Operation {
  inputs: Operand[] = [];
  outputs: Output[] = [];

  constructor(inputs: Operand[]) {
    utils.assert(
        inputs.every(input => input instanceof Operand),
        'The inputs parameter is invalid.');
    this.inputs = inputs;
    this.outputs.push(new Output(this));
  }

  get output(): Output {
    return this.outputs[0];
  }

  protected getTensor(operand: Operand, context: ExecutionContext): tf.Tensor {
    if (operand instanceof Constant) {
      return context.constantTenosrs.get(operand);
    } else if (operand instanceof Input) {
      return context.inputTensors.get(operand);
    } else if (operand instanceof Output) {
      return operand.operation.run(context);
    } else {
      throw new Error('The operand is invalid.');
    }
  }

  abstract run(context: ExecutionContext): tf.Tensor;
}