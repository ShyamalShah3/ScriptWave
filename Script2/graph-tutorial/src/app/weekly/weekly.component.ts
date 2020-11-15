// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/*
import * as moment from 'moment-timezone';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';


import { GraphService } from '../graph.service';
import { Event, DateTimeTimeZone } from '../event';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {

  public events: Event[];

  constructor(
    private graphService: GraphService,
    private alertsService: AlertsService) { }

  // <ngOnInitSnippet>
  ngOnInit() {
    this.graphService.getEvents()
      .then((events) => {
        this.events = events;
      });
  }
  // </ngOnInitSnippet>

  // <formatDateTimeTimeZoneSnippet>
  formatDateTimeTimeZone(dateTime: DateTimeTimeZone): string {
    try {
      return moment.tz(dateTime.dateTime, dateTime.timeZone).format();
    }
    catch (error) {
      this.alertsService.add('DateTimeTimeZone conversion error', JSON.stringify(error));
    }
  }
  // </formatDateTimeTimeZoneSnippet>
}
*/
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MgtAgenda } from '@microsoft/mgt';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements AfterViewInit {
  @ViewChild('myagenda', { static: true })
  agendaElement: ElementRef<MgtAgenda>;

  constructor() { }

  ngAfterViewInit() {
    this.agendaElement.nativeElement.templateContext = {
      openWebLink: (e: any, context: { event: { webLink: string | undefined; }; }, root: any) => {
        window.open(context.event.webLink, '_blank');
      },
      getDate: (dateString: string) => {
        const dateObject = new Date(dateString);
        return dateObject.setHours(0, 0, 0, 0);
      },
      getTime: (dateString: string) => {
        const dateObject = new Date(dateString);
        return dateObject.getHours().toString().padEnd(2, '0')
          + ':' + dateObject.getMinutes().toString().padEnd(2, '0');
      }
    };
  }
}

