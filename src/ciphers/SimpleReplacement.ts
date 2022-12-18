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

  // замінюємо літери на відповідні літери з ключа
  public encrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v) => this._key[constants.Alphabet.indexOf(v)]);
    return _input.join("");
  }

  // робимо обернену заміну
  public decrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v) => constants.Alphabet[this._key.indexOf(v)]);
    return _input.join("");
  }

  // генеруємо ключ з літер алфавіту, змішаних випадковим чином
  private generateKey(): string {
    let letters = constants.Alphabet.split("");
    letters = letters
      .map((value) => ({ value: value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((value) => value.value);
    return letters.join("");
  }

  // перетворюємо вхідний текст на заглавні літери
  // та видаляємо символи, яких немає в алфавіті
  private prepareInput(text: string): string[] {
    return text
      .toUpperCase()
      .split("")
      .filter((v) => constants.Alphabet.includes(v));
  }

  // перевіряємо правильність ключа
  private checkKey(key: string): boolean {
    let distinctKey = new Set(key);
    return (
      key.length === constants.Alphabet.length &&
      distinctKey.size === constants.Alphabet.length
    );
  }
}

export default SimpleReplacement;
