import constants from "../Constants";

class SimpleReplacement {
  private _key: string;
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
    _input = _input.map((v) => this._key[constants.Alphabet.indexOf(v)]);
    return _input.join("");
  }

  public decrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v) => constants.Alphabet[this._key.indexOf(v)]);
    return _input.join("");
  }

  private generateKey(): string {
    let letters = constants.Alphabet.split("");
    letters = letters
      .map((value) => ({ value: value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((value) => value.value);
    return letters.join("");
  }

  private prepareInput(text: string): string[] {
    return text
      .toUpperCase()
      .split("")
      .filter((v) => constants.Alphabet.includes(v));
  }

  private checkKey(key: string): boolean {
    let distinctKey = new Set(key);
    return (
      key.length === constants.Alphabet.length &&
      distinctKey.size === constants.Alphabet.length
    );
  }
}

export default SimpleReplacement;
