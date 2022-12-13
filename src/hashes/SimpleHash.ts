import constants from "../Constants";

class SimpleHash {
    private _h = 9;

    public calculate(surname: string): string {
        if (!Array.from(surname.toUpperCase()).every(c => constants.Alphabet.includes(c)) || surname.length === 0) throw Error("Погане повідомлення");
        let msg = this.filterMsg(`ВИДАТИ_СТО_ГРН_ГЛБУХ_${surname.toUpperCase()}`)
        let h = this._h;

        Array.from(msg).map(c => h = ((h + constants.Alphabet.indexOf(c) + 1) ** 2) % 33)
        return h.toString(2);
    }

    private filterMsg(msg: string): string {
        return Array.from(msg).filter(c => constants.Alphabet.includes(c)).join()
    }
}

export default SimpleHash;