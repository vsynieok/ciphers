class ElGamal {
    private _q: number;
    private _key: number;

    constructor() {
        this._q = this.randInt(10**20, 10**50)
        this._key = this.generateKey(this._q)
    }

    public getSignature(repr: string) {
        let a = this.randInt(2, 10);
        let msg = parseInt(repr, 2);

        let g = this.randInt(2, this._q)
        let key = this.generateKey(this._q)
        let h = this.power(g, key, this._q)
        const encryption = this.encrypt(msg, this._q, h, g)
        return encryption
    }

    public getDecrSignature(text: any, p: number) {
        return this.decrypt(text, p, this._key, this._q)
    }

    private randInt(min: number, max: number) : number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    } 
 
    private gcd(a: number,b: number) : number {
        if (a < b) return this.gcd(b,a)
        else if (a%b == 0) return b;
        return this.gcd(b, a % b)
     }
 
    private generateKey(q: number): number {
       let key = this.randInt(10**20, q)
    
       while (this.gcd(q,key) != 1) key = this.randInt(10**20,q)
       return key;
    }
 
    private power(a: number, b: number, c: number): number {
       let x = 1;
       let y = 1;
    
       while (b>0){
           if(b%2 != 0){  
               x = (x*x) % c;
           }
           y = (y * y) % c
           b = Math.round(b / 2)
       }
       return x % c
    }
 
    private encrypt(text: any, q: number, h: number, g: number) {
       const k = this.generateKey(q);
       const s = this.power(h,k,q);
       const p = this.power(g, k, q);
    
       const eText = text.repeat(s);
    
       return {
           text: eText,
           p: p
       }
    }

    private decrypt(eText: any, p: number, key: number, q: number): string {
       const h = this.power(p,key,q);
       return Math.round(eText/h).toString(2)
    }

}
 
export default ElGamal;