import { Matrix } from "../../utilities/matrix";
import { DejavuUtils } from "./dejavu.utils";

type ILayer = {
  weights: Matrix;
  bias: Matrix;
  output: Matrix;
  activation: string;
};

export class DejavuComponent {
  public layers: {
    length: number;
    [key: number]: ILayer;
  };
  public lr: number;
  public it: number;

  constructor(nn = [0], learningRate = 0.1, iterations = 100) {
    this.layers = { length: 0 };

    for (let i = 0; i < nn.length - 1; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.layers[i] = {} as any;
      this.layers[i]["weights"] = new Matrix(nn[i + 1], nn[i], "RANDOM");
      this.layers[i]["bias"] = new Matrix(nn[i + 1], 1, "RANDOM");
      this.layers[i]["activation"] = "tanh";

      this.layers["length"] += 1;
    }

    this.lr = learningRate;

    this.it = iterations;
  }

  predict(input: number[] | Matrix) {
    let output =
      input instanceof Matrix ? input : new Matrix(input.length, 1, input);

    for (let i = 0; i < this.layers.length; i++) {
      output = this.layers[i]["weights"].multiply(output);

      this.layers[i]["output"] = output;

      this.layers[i]["output"].add(this.layers[i]["bias"]);

      this.layers[i]["output"].foreach(
        DejavuUtils.activations[this.layers[i]["activation"]]["func"]
      );
    }

    return this.layers[this.layers.length - 1]["output"];
  }

  public shuffle(x: unknown[], y: unknown[]) {
    for (let i = 0; i < y.length; i++) {
      const pos = Math.floor(Math.random() * y.length);

      const tmpy = y[i];

      const tmpx = x[i];

      y[i] = y[pos];
      x[i] = x[pos];
      y[pos] = tmpy;
      x[pos] = tmpx;
    }
  }
}
