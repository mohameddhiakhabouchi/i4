
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit {
  @Input() data: any;
  @Output() subscribe = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  subscribeToNewsletter(data: string) {
    this.subscribe.emit(data);
  }

}
