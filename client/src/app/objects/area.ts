import {Action, ActionAdapter} from './action';

export class Area {
    public name: string;
    public actions: Action[];
    public on = false;
    public id: string;


    constructor(id: string, name: string = 'Basic Area', actions: Action[] = [], on: boolean = false) {
        this.name = name;
        this.actions = actions;
        this.on = on;
        this.id = id;
    }
}

export class AreaAdapter {
    static adapt(item: any): Area {
        return new Area(item.id, item.name, ActionAdapter.adaptArea(item));
    }

    static adaptFromNew(id: any, name): Area {
        return new Area(id, name, []);
    }
}
