export class Product {
    constructor(
        public data: Data[],
        public message: string
        ){}
}

export class Data {
    constructor(
        public id: String,
        public price: string,
        public quantity: string
        ){}
}