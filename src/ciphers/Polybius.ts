import constants from "../Constants";

class Polybius {
  private _key: string | null = null;
  private _matrixWidth = 5;
  private _matrix: string | null = null;

  constructor(key: string) {
    if (!this.checkKey(key)) throw new Error("Поганий ключ");
    this.key = key; 
  }

  get key(): string {
    return this._key as string
  }

  // при встановленні нового ключа, генеруємо нову матрицю
  set key(value: string) {
    this._key = value;
    this._matrix = this.generateMatrix();
  }

  // розшифрування
  public decrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v) => (this._matrix as string).charAt(this.getDecryptIdx(v)));
    return _input.join("");
  }

  // зашифрування
  public encrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v) => (this._matrix as string).charAt(this.getEncryptIdx(v)));
    return _input.join("");
  }

  // генерація матриці
  private generateMatrix(): string {
    // отримуємо кількість символів, які треба дозаповнити цифрами
    let divideDifference = this._matrixWidth - constants.Alphabet.length % this._matrixWidth;
    let length = constants.Alphabet.length + divideDifference;

    // отримуємо літери, яких немає в ключу
    let excludedAlphabet = Array.from(constants.Alphabet).filter(c => !this.key.includes(c)).join('')
    let matrix = this.key;

    // доставляємо літери після ключа
    for (let i = this.key.length; i < length - divideDifference; i++) {
      matrix = matrix + excludedAlphabet.charAt(i - this.key.length);
    }

    // доставляємо цифри на пусті місця
    for (let i = length - divideDifference, k = 1; i < length; i++, k++) {
      matrix = matrix + String(k).charAt(0)
    }

    return matrix
  }

  // знаходимо індекс літери в матриці для шифрування
  private getEncryptIdx(c: string) {
    let idx = this._matrix?.indexOf(c) as number + this._matrixWidth;
    if (idx >= (this._matrix?.length as number)) idx = idx - (this._matrix?.length as number)
    return idx;
  }

  // знаходимо індекс літери в матриці для дешифрування
  private getDecryptIdx(c: string) {
    let idx = this._matrix?.indexOf(c) as number - this._matrixWidth;
    if (idx < 0) idx = (this._matrix?.length as number) + idx
    return idx;
  }

  private prepareInput(text: string): string[] {
    return text
      .toUpperCase()
      .split("")
      .filter((v) => this._matrix?.includes(v));
  }

  private checkKey(key: string): boolean {
    let distinctKey = new Set(key);
    return (
      Array.from(key).every(c => constants.Alphabet.includes(c)) &&
      distinctKey.size === key.length
    );
  }
}

export default Polybius;
