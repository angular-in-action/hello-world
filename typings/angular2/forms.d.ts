declare module "angular2/forms" {
  export var FORM_DIRECTIVES: any;
  export var FORM_BINDINGS: any;
  export var Control: any;
  export class ControlGroup {
    constructor (data: any);
    value: any;
    controls: any;
  }
}
