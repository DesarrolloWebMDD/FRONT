import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[onlyInteger]'
})
export class OnlyIntegerDirective {
    constructor(public el: ElementRef, public renderer: Renderer2) { };

    @HostListener('paste', ['$event']) onPaste(e:any) {
        const pattern = /^[0-9]*$/g;
        if (!pattern.test(e.clipboardData.getData('text'))) e.preventDefault();
    }

    @HostListener('keypress', ['$event']) onInput(e:any) {
        const pattern = /^[0-9]*$/g;
        if (!pattern.test(e.key)) e.preventDefault();
    }
}