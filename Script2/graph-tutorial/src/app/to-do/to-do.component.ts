// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { GraphService } from '../graph.service';
import { Event, DateTimeTimeZone } from '../event';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  public events: Event[];

  constructor(
    private graphService: GraphService,
    private alertsService: AlertsService) { }

  // <ngOnInitSnippet>
  ngOnInit() {
    this.graphService.getDailyEvents()
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

  formatDate(dateTime: DateTimeTimeZone): string {
    try {
      var year = dateTime.dateTime.substr(0, 4);
      var month = dateTime.dateTime.substr(5, 2);
      var date = dateTime.dateTime.substr(8, 2);
      var monthString;

      switch (month) {
        case "01":
          monthString = 'January';
          break;
        case "02":
          monthString = 'February';
          break;
        case "03":
          monthString = 'March';
          break;
        case "04":
          monthString = 'April';
          break;
        case "05":
          monthString = 'May';
          break;
        case "06":
          monthString = 'June';
          break;
        case "07":
          monthString = 'July';
          break;
        case "08":
          monthString = 'August';
          break;
        case "09":
          monthString = 'September';
          break;
        case "10":
          monthString = 'October';
          break;
        case "11":
          monthString = 'November';
          break;
        case "12":
          monthString = 'December';
          break;
        default:
          throw "FORMAT DATE ERROR";
      }

      return (monthString + ', ' + date + ', ' + year);

    }
    catch (error) {
      this.alertsService.add('DateTimeTimeZone conversion error', JSON.stringify(error));
    }
  }
  // </formatDateTimeTimeZoneSnippet>
}
