import {  } from '@angular/core/core';
import { Directive, HostListener, Renderer2, ElementRef, OnInit, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropDownDirective implements OnInit{

        constructor (private renderer: Renderer2, private elRef: ElementRef) {

    }

    @HostBinding('class.open') openDropdown = false;

    @HostListener('click') toggleDropdown(eventData: Event) {
        this.openDropdown = !this.openDropdown;
    }

    ngOnInit() {
        this.renderer.addClass(this.elRef.nativeElement, "open");
    }

}