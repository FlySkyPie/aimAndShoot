export class Matrix {
  public rows: number;
  public cols: number;
  public data: number[];

  constructor(
    rows: number,
    cols: number,
    values: number | "RANDOM" | number[] = 0
  ) {
    this.rows = rows || 0;

    this.cols = cols || 0;

    if (values instanceof Array) {
      if (this.rows * this.cols != values.length) {
        console.log(this.rows, this.cols, values.length);

        throw new Error(
          "The number of rows * cols should be equal to the length of the values"
        );
      }

      this.data = values.slice();
    } else if (values == "RANDOM") {
      this.data = Array.from({ length: this.rows * this.cols }).map(
        (_) => Math.random() * 2 - 1
      );
    } else {
      this.data = Array.from({ length: this.rows * this.cols }, () => values);
    }
  }

  public multiply(b: Matrix) {
    if (b.rows !== this.cols) {
      throw new Error("Cols from Matrix A should be equal to Rows of Matrix B");
    }

    let result = new Matrix(this.rows, b.cols);

    for (
      let i = 0, j = 0;
      i < this.rows && j < b.cols;
      j++, i = j == b.cols ? i + 1 : i, j = j == b.cols ? (j = 0) : j
    ) {
      let s = 0;

      for (let k = 0; k < this.cols; k++) {
        s += this.data[i * this.cols + k] * b.data[k * b.cols + j];
      }

      result.data[i * result.cols + j] = s;
    }

    return result;
  }

  public transpose() {
    for (
      let i = 0, j = 0;
      i < this.rows && j < this.cols;
      j++, i = j == this.cols ? i + 1 : i, j = j == this.cols ? (j = 0) : j
    ) {
      let temp = this.data[i * this.cols + j];

      this.data[i * this.cols + j] = this.data[j * this.rows + i];

      this.data[j * this.rows + i] = temp;
    }

    let temp = this.cols;

    this.cols = this.rows;

    this.rows = temp;
  }

  public add(a: Matrix) {
    if (this.rows != a.rows || this.cols != a.cols) {
      throw new Error("Cant add Matrix of different sizes!");
    }

    for (let i = 0; i < this.data.length; i++) {
      this.data[i] += a.data[i];
    }
  }

  public subtract(a: Matrix) {
    if (this.rows != a.rows || this.cols != a.cols) {
      throw new Error("Cant subtract Matrix of different sizes!");
    }

    for (let i = 0; i < this.data.length; i++) {
      this.data[i] -= a.data[i];
    }
  }

  public scalar(a: number) {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] *= a;
    }
  }

  public hadamard(a: Matrix) {
    if (this.rows != a.rows || this.cols != a.cols) {
      throw new Error("Cant multiply Matrix of different sizes!");
    }

    for (let i = 0; i < this.data.length; i++) {
      this.data[i] *= a.data[i];
    }
  }

  public copy() {
    return new Matrix(this.rows, this.cols, this.data.slice());
  }

  public foreach(func: (value: number) => number) {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = func(this.data[i]);
    }
  }
}
