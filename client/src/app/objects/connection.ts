export class Connection {
    private _id: string;
    private _name: string;

    constructor(id: string = '', type: string = '') {
        this._id = id;
        this._name = type;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}

export class AccountAdapter {
    static adapt(item: any): Connection {
        return new Connection(item.id, item.name);
    }
}
