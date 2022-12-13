import constants from "../Constants";

class RSASignature {
    private _e = 7;
    private _d = 3;
    private _n = 33;

    public check(repr: string): boolean {
        let hash = parseInt(repr, 2);
        let c = (hash**this._e) % this._n;
        let m = (c**this._d) % this._n;
        return m === hash;
    }
}

export default RSASignature;