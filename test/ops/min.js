'use strict';
import * as utils from '../utils.js';

describe('test min', function() {
  const nn = navigator.ml.getNeuralNetworkContext();

  it('min', async function() {
    const builder = nn.createModelBuilder();
    const a = builder.input('a', {type: 'float32', dimensions: [3, 4, 5]});
    const b = builder.input('b', {type: 'float32', dimensions: [3, 4, 5]});
    const c = builder.min(a, b);
    const model = builder.createModel({c});
    const compiledModel = await model.compile();
    const inputs = {
      'a': {
        buffer: new Float32Array([
          0.30360392,  0.79021126,  0.11072686,  1.0779074,   -0.02202512,
          -0.4660466,  0.5439212,   -1.1046865,  -0.7237214,  1.7275667,
          0.05005725,  0.03450501,  -0.93030375, 0.8889801,   1.6954619,
          -0.01362751, -0.276192,   0.05534686,  1.046008,    0.10164198,
          0.5601633,   -0.32077986, -0.59266484, -0.39202943, -0.03543149,
          -0.311161,   -2.6089416,  0.5112193,   -1.4783202,  -0.8066068,
          0.77324635,  1.5120724,   1.3049824,   -0.03303701, 1.201271,
          -0.08360443, -1.0856549,  -1.268517,   -0.77472717, -0.6026987,
          -0.37952536, -1.1476341,  0.08269309,  1.0225683,   -1.4790517,
          1.9010514,   -0.8733177,  -0.08186013, 1.1718949,   -0.01093488,
          -0.3274254,  0.73195547,  -0.5514492,  -0.7521337,  -1.0613606,
          0.6751333,   0.9138903,   1.7775172,   0.5034791,   0.00691956,
        ]),
      },
      'b': {
        buffer: new Float32Array([
          -0.3013072,  -0.09710764, 0.19347863,  0.57673335,  -0.9459303,
          -0.311303,   -0.51731133, 0.05566696,  0.1896354,   -2.4551184,
          0.49731326,  -0.505013,   0.38610065,  -0.46502006, 0.11969721,
          0.52275103,  0.25405633,  -2.177016,   0.36703554,  0.33286744,
          -0.49586803, 0.09411436,  0.38203833,  -1.8008012,  0.4627897,
          -0.14300857, 0.26225486,  0.10055642,  1.5006567,   -0.04743041,
          -0.7460712,  -1.3833494,  -0.2873905,  -1.8731467,  -1.006253,
          -0.21216351, -1.2171068,  0.1594863,   -1.7146875,  0.21852039,
          1.3147641,   0.28219756,  -0.84008366, -0.979971,   0.2722022,
          1.1494406,   -1.4083267,  0.09631079,  -0.04712944, -0.8959271,
          1.2020742,   -0.24440259, 0.18198308,  -1.3384086,  -0.5169678,
          -0.6608337,  0.30539933,  -1.529869,   -0.70533603, -2.1911235,
        ]),
      },
    };
    const outputs = await compiledModel.compute(inputs);
    utils.checkShape(outputs.c.dimensions, [3, 4, 5]);
    const expected = [
      -0.3013072,  -0.09710764, 0.11072686,  0.57673335,  -0.9459303,
      -0.4660466,  -0.51731133, -1.1046865,  -0.7237214,  -2.4551184,
      0.05005725,  -0.505013,   -0.93030375, -0.46502006, 0.11969721,
      -0.01362751, -0.276192,   -2.177016,   0.36703554,  0.10164198,
      -0.49586803, -0.32077986, -0.59266484, -1.8008012,  -0.03543149,
      -0.311161,   -2.6089416,  0.10055642,  -1.4783202,  -0.8066068,
      -0.7460712,  -1.3833494,  -0.2873905,  -1.8731467,  -1.006253,
      -0.21216351, -1.2171068,  -1.268517,   -1.7146875,  -0.6026987,
      -0.37952536, -1.1476341,  -0.84008366, -0.979971,   -1.4790517,
      1.1494406,   -1.4083267,  -0.08186013, -0.04712944, -0.8959271,
      -0.3274254,  -0.24440259, -0.5514492,  -1.3384086,  -1.0613606,
      -0.6608337,  0.30539933,  -1.529869,   -0.70533603, -2.1911235,
    ];
    utils.checkValue(outputs.c.buffer, expected);
  });

  it('min broadcast', async function() {
    const builder = nn.createModelBuilder();
    const a = builder.input('a', {type: 'float32', dimensions: [3, 4, 5]});
    const b = builder.input('b', {type: 'float32', dimensions: [5]});
    const c = builder.min(a, b);
    const model = builder.createModel({c});
    const compiledModel = await model.compile();
    const inputs = {
      'a': {
        buffer: new Float32Array([
          0.09259097,  -1.2761278,  0.63461846,  0.83395857,  -0.6424096,
          -0.10002025, 0.2483844,   1.324728,    0.7070375,   -0.24927127,
          -1.1588863,  0.05159701,  -0.27449006, 1.3718864,   -0.2961051,
          -0.21801688, 0.4596571,   -0.2982913,  -2.4248464,  0.25273538,
          0.04604488,  -0.87013924, 1.554572,    0.41449285,  -0.68581927,
          0.21872331,  0.5650471,   -1.3366132,  -0.34167227, 1.4196033,
          -0.9094157,  0.5909053,   0.20646141,  0.23326884,  0.27068487,
          -0.2444074,  0.44961262,  -1.3790505,  -1.4981223,  1.9089019,
          0.6859794,   -1.6197531,  -0.85252583, 0.3867299,   0.9107394,
          0.63347656,  -2.0192556,  0.49276412,  0.5069547,   0.14318226,
          -0.5055633,  -1.2882828,  0.00957129,  0.41766334,  -0.53743577,
          0.3123349,   0.04377401,  -0.26201916, -1.6016098,  -0.74272215,
        ]),
      },
      'b': {
        buffer: new Float32Array([
          0.6450575,
          -1.302236,
          0.27485028,
          1.8353013,
          -0.83993983,
        ]),
      },
    };
    const outputs = await compiledModel.compute(inputs);
    utils.checkShape(outputs.c.dimensions, [3, 4, 5]);
    const expected = [
      0.09259097,  -1.302236,  0.27485028,  0.83395857,  -0.83993983,
      -0.10002025, -1.302236,  0.27485028,  0.7070375,   -0.83993983,
      -1.1588863,  -1.302236,  -0.27449006, 1.3718864,   -0.83993983,
      -0.21801688, -1.302236,  -0.2982913,  -2.4248464,  -0.83993983,
      0.04604488,  -1.302236,  0.27485028,  0.41449285,  -0.83993983,
      0.21872331,  -1.302236,  -1.3366132,  -0.34167227, -0.83993983,
      -0.9094157,  -1.302236,  0.20646141,  0.23326884,  -0.83993983,
      -0.2444074,  -1.302236,  -1.3790505,  -1.4981223,  -0.83993983,
      0.6450575,   -1.6197531, -0.85252583, 0.3867299,   -0.83993983,
      0.63347656,  -2.0192556, 0.27485028,  0.5069547,   -0.83993983,
      -0.5055633,  -1.302236,  0.00957129,  0.41766334,  -0.83993983,
      0.3123349,   -1.302236,  -0.26201916, -1.6016098,  -0.83993983,
    ];
    utils.checkValue(outputs.c.buffer, expected);
  });
});
