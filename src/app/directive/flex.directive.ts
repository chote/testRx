import { Directive, ElementRef, Renderer,Input,Output,HostBinding } from '@angular/core';
@Directive({
    selector:'[layout]'
  })
  export class LayoutDirective{
    @Input() layout:string;
    @HostBinding('style.display') display = 'flex';
  
    @HostBinding('style.flex-direction')
    get direction(){
         return (this.layout === 'column') ? 'column':'row';
    }
  }
  @Directive({
    selector:'[flex]'
  })
  export class FlexDirective{
      @Input() shrink:number = 1;
      @Input() grow:number = 1;
      @Input() flex:string;
  
      @HostBinding('style.flex')
      get style(){
          return `${this.grow} ${this.shrink} ${this.flex === '' ? '0':this.flex}%`;
      }
  }