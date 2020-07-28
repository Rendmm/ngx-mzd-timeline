import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'mzd-timeline-content',
  templateUrl: './timeline-content.component.html',
  styleUrls: ['./timeline-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MzdTimelineContentComponent implements OnInit {

  @Input() card: boolean = true;
  @Input() border = false;
  @Input() color: ThemePalette | 'gray' = 'gray';
  @Input() side: 'left' | 'right' | undefined = undefined;

  set left(value: boolean) {
    this.elementRef.nativeElement.classList.toggle('content-left', value);
  }

  set right(value: boolean) {
    this.elementRef.nativeElement.classList.toggle('content-right', value);
  }

  set noAlternate(value: boolean) {
    this.elementRef.nativeElement.classList.toggle('no-alternate', value);
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void { }

}
