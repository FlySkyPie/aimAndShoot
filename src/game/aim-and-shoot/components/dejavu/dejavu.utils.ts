type IActivations = {
  [key: string]: {
    func: (x: number) => number;
    dfunc: (x: number) => number;
  };
};

export abstract class DejavuUtils {
  public static activations: IActivations = {
    sigmoid: {
      func: (x: number) => 1 / (1 + Math.exp(-x)),
      dfunc: (x: number) => x * (1 - x),
    },
    relu: {
      func: (x: number) => (x < 0 ? 0 : x),
      dfunc: (x: number) => (x < 0 ? 0 : 1),
    },
    tanh: {
      func: (x: number) => Math.tanh(x),
      dfunc: (x: number) => 1 - x * x,
    },
    identity: {
      func: (x: number) => x,
      dfunc: () => 1,
    },
  };
}
