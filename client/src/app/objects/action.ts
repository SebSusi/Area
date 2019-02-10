export class Action {
    private name = 'basic action';
    private type = 'unknown';
    private params: Map<string, (string|number|boolean)>[];
    private infos: Map<string, (string|number|boolean)>[];
}
