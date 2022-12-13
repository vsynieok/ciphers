import constants from "../Constants";

class SimpleRearragement {
  private _key: string;
  private _width = 5;

  public key: string;

  constructor(key?: string) {
    if (key) {
      if (!this.checkKey(key)) throw new Error("Поганий ключ");
    }

    this._key = key ?? this.generateKey();
    this.key = this._key;
  }

  public encrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v, i) => {
      let idx = parseInt(this._key.charAt(i % this._width));
      return _input[idx + Math.floor(i / this._width) * this._width];
    });
    return _input.join("");
  }

  public decrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v, i) => {
      let idx = this._key.indexOf((i % this._width).toString());
      return _input[idx + Math.floor(i / this._width) * this._width];
    });
    return _input.join("");
  }

  private generateKey(): string {
    let letters: number[] = Array.from(Array(this._width).keys());
    letters = letters
      .map((value) => ({ value: value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((value) => value.value);
    return letters.join("");
  }

  private prepareInput(text: string): string[] {
    let str = text
      .toUpperCase()
      .split("")
      .filter((v) => constants.Alphabet.includes(v));
    let remainder = str.length % this._width;
    if (remainder !== 0)
      str = str.concat(
        constants.Alphabet.slice(0, this._width - remainder).split("")
      );
    return str;
  }

  private checkKey(key: string): boolean {
    let distinctKey = new Set(key);
    return (
      key.split("").every((v) => {
        let n = parseInt(v);
        return n < this._width && n >= 0;
      }) && distinctKey.size === this._width
    );
  }
}

export default SimpleRearragement;
