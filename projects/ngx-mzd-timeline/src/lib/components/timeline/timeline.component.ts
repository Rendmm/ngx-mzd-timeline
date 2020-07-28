import {
  AfterViewInit, Component, ContentChildren, Input, OnChanges, OnInit, QueryList, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { MzdTimelineContentComponent } from '../timeline-content/timeline-content.component';

@Component({
  selector: 'mzd-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MzdTimelineComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() firstContentSide: 'left' | 'right' = 'left';
  @Input() alternateSide: boolean = true;
  @ContentChildren(MzdTimelineContentComponent) contents: QueryList<MzdTimelineContentComponent> = [] as any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterViewInit();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.alternateSide) {
      this.handleAlternateSide();
    } else {
      this.handleOneSide();
    }
    this.contents.forEach(content => content.noAlternate = !this.alternateSide);
  }

  private handleAlternateSide() {
    const alternateSideDecider = this.firstContentSide === 'left' ? 0 : 1;

    this.contents.forEach((content, index) => {
      if (content.side === undefined) {
        content.left = (index % 2 === alternateSideDecider);
        content.right = !(index % 2 === alternateSideDecider);
      } else {
        content.left = content.side === 'left';
        content.right = content.side === 'right';
      }

    });
  }

  private handleOneSide() {
    this.contents.forEach(content => {
      content.left = this.firstContentSide === 'left';
      content.right = this.firstContentSide === 'right';
    });
  }

}
