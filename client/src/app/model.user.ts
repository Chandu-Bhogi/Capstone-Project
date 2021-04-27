export class User {
    constructor(
        public status: boolean,
        public user: Data[],
        public message: string
        ){}
}

export class Data {
    constructor(
        public cart: any,
        public dod: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public locked: boolean,
        public password: string,
        public phoneNumber: string,
        public userName: string
        ){}
}