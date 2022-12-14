import constants from "../Constants";

class Thritemius {
  private _key: string;

  public key: string;

  constructor(key?: string) {
    if (key) {
      if (!this.checkKey(key)) throw new Error("Поганий ключ");
    }

    this._key = this.trimKey(key) ?? this.generateKey();
    this.key = this._key;
  }

  // замінюємо вхідні літери на ті, що
  // знаходяться на відповідних місцях
  // в строках по ключу
  public encrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v, i) => {
      let row = constants.Alphabet.indexOf(
        this._key.charAt(i % this._key.length)
      );
      return constants.Alphabet.charAt(
        (constants.Alphabet.indexOf(v) + row) % constants.Alphabet.length
      );
    });
    return _input.join("");
  }

  // робимо обернену заміну літер
  public decrypt(input: string): string {
    let _input = this.prepareInput(input);
    _input = _input.map((v, i) => {
      let row = constants.Alphabet.indexOf(
        this._key.charAt(i % this._key.length)
      );
      let pos = constants.Alphabet.indexOf(v) - row;
      if (pos < 0) pos = constants.Alphabet.length + pos
      return constants.Alphabet.charAt(pos % constants.Alphabet.length)
    })
      
    return _input.join("");
  }

  // генеруємо ключ з літер алфавіту
  // змішаних випадковим чином
  private generateKey(): string {
    let letters = constants.Alphabet.split("");
    letters = letters
      .map((value) => ({ value: value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((value) => value.value);
    return letters.join("");
  }

  // обрізаємо ключ по довжині алфавіту
  private trimKey(key?: string): string | undefined {
    if (!key || key.length === constants.Alphabet.length) return key;

    let extendedKey = constants.Alphabet.split("").map((v, i) => {
      return key.charAt(i % key.length);
    });

    return extendedKey.join("");
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

export default Thritemius;
