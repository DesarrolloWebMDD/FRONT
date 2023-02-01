export class JsonResult<TData> {
    public isValid: boolean = false ;
    public valid: boolean = false;
    public message: string = "";
    public detail: string = "";
    public data: TData;
    public warning: boolean = false;

    constructor(data: TData) {
        this.isValid = true;
        this.data = data;
    }
}