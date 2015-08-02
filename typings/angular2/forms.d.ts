declare module "angular2/forms" {
  export var formDirectives: any;
  export var Control: any;
  export class ControlGroup {
    constructor (data: any);
    value: any;
    controls: any;
  }
}
