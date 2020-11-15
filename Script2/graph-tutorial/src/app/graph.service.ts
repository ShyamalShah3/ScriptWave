// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet>
import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';

import { AuthService } from './auth.service';
import { Event } from './event';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphClient: Client;
  constructor(
    private authService: AuthService,
    private alertsService: AlertsService) {

    // Initialize the Graph client
    this.graphClient = Client.init({
      authProvider: async (done) => {
        // Get the token from the auth service
        let token = await this.authService.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token) {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });
  }

  async getEvents(): Promise<Event[]> {
    try {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var nextFirstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      let result = await this.graphClient
        .api('/me/events')
        .select('subject,organizer,start,end')
        .orderby('start/dateTime ASC')
        .filter(`start/dateTime ge '${firstDay}' and start/dateTime lt '${nextFirstDay}`)
        .get();

      return result.value;
    } catch (error) {
      this.alertsService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }

  async getWeeklyEvents(): Promise<Event[]> {
    var today = new Date();
    var dd = String(today.getDate() + 1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = new Date(mm + '/' + dd + '/' + yyyy);
    var todayString = today.toLocaleDateString();

    var finalDate = new Date();
    finalDate.setDate(today.getDate() + 7);
    var finalString = finalDate.toLocaleDateString();
    try {
      let result = await this.graphClient
        .api('/me/calendarview?startdatetime=' + todayString + '&enddatetime=' + finalString)
        .select('subject,organizer,start,end')
        //.orderby('createdDateTime DESC')
        .get();

      return result.value;
    } catch (error) {
      this.alertsService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }

  async getDailyEvents(): Promise<Event[]> {
    var today = new Date();
    var dd = String(today.getDate() + 1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = new Date(mm + '/' + dd + '/' + yyyy);
    var todayString = today.toLocaleDateString();

    var finalDate = new Date(today.toLocaleDateString());
    finalDate.setDate(today.getDate());
    var finalString = finalDate.toLocaleDateString();
    try {
      let result = await this.graphClient
        .api('/me/calendarview?startdatetime=' + todayString + '&enddatetime=' + finalString)
        .select('subject,organizer,start,end')
        .orderby('createdDateTime DESC')
        .get();

      return result.value;
    } catch (error) {
      this.alertsService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }
}


// + '/' + '0' + '/' + '0' + '/' + '0' + '/' + '0'
