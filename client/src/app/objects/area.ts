import {Action, ActionAdapter} from './action';

export class Area {
    public name: string;
    public actions: Action[];
    public on = false;
    public id: string;
    public timer: number;
    public checked: boolean;


    constructor(id: string, name: string = 'Basic Area', on: boolean = false, timer = 5, actions: Action[] = []) {
        this.name = name;
        this.actions = actions;
        this.on = on;
        this.id = id;
        this.timer = timer;
    }
}

export class AreaAdapter {
    static adapt(item: any): Area {
        console.log(item);
        return new Area(item.uniqueId, item.name, item.activated, item.timer, ActionAdapter.adaptArea(item));
    }

    static adaptFromNew(id: any, name): Area {
        return new Area(id, name);
    }
}
