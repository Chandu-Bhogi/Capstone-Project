export class Product {
    constructor(
        public data: Data[],
        public message: string
        ){}
}

export class Data {
    constructor(
        public id: Number,
        public name: string,
        public quantity: string
        ){}
}