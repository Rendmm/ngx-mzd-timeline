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
  @Input() chat = false;
  @ContentChildren(MzdTimelineContentComponent) contents: QueryList<MzdTimelineContentComponent> = [] as any;

  width = 0;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterViewInit();
  }

  onResize(event) {
    const oldWidth = this.width;
    this.width = event.target.innerWidth;
    if ((oldWidth < 600 && this.width >= 600) || (oldWidth >= 600 && this.width < 600)) {
      this.setContentProperties();
    }
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
    if (this.alternateSide) {
      this.handleAlternateSide();
    } else {
      this.handleOneSide();
    }
    this.setContentProperties()
  }

  private setContentProperties() {
    this.contents.forEach(content => {
      content.chat = this.chat && this.alternateSide && this.width > 599;
      content.noAlternate = !this.alternateSide;
    });
  }

  private handleAlternateSide() {
    const alternateSideDecider = this.firstContentSide === 'left' ? 0 : 1;
    if (this.chat && this.width > 599) {
      this.contents.forEach((content, index) => {
        if (content.side === undefined) {
          content.left = !(index % 2 === alternateSideDecider);
          content.right = (index % 2 === alternateSideDecider);
        } else {
          content.left = content.side === 'right';
          content.right = content.side === 'left';
        }

      });
    } else {
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
  }

  private handleOneSide() {
    this.contents.forEach(content => {
      content.left = this.firstContentSide === 'left';
      content.right = this.firstContentSide === 'right';
    });
  }

}
