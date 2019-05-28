import { Component, ElementRef, AfterViewInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from './../app.component';
import * as OT from '@opentok/client';
import { OpentokService } from '../opentok.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})

export class SubscriberComponent implements AfterViewInit {
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  @ViewChild('subscriberDiv2') subscriberDiv2: ElementRef;
  @Input() session: OT.Session;
  @Input() stream: OT.Stream;
  subscriber: any;
  appComponent;

  constructor(private ref: ChangeDetectorRef, private service: OpentokService) {
    this.appComponent = new AppComponent(ref, service);
  }

  ngAfterViewInit() {
    console.log(this.subscriberDiv.nativeElement);
    this.subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {}, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  }

  unsubscribe() {
    console.log('Unsubscribing');
    console.log(this.subscriberDiv.nativeElement, this.subscriberDiv2.nativeElement);
    this.session.unsubscribe(this.subscriber);
    this.subscriberDiv.nativeElement = null;
    this.subscriberDiv2.nativeElement = null;
  }

  subscribe() {
    this.subscriber = this.session.subscribe(this.stream, this.subscriberDiv2.nativeElement, {}, (err) => {
      console.log(err);
    });
  }
}
