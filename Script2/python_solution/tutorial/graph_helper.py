# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

# <FirstCodeSnippet>
from requests_oauthlib import OAuth2Session
import datetime

graph_url = 'https://graph.microsoft.com/v1.0'


def get_user(token):
    graph_client = OAuth2Session(token=token)
    # Send GET to /me
    user = graph_client.get('{0}/me'.format(graph_url))
    # Return the JSON result
    return user.json()
# </FirstCodeSnippet>

# <GetCalendarSnippet>


def get_calendar_events(token):
    graph_client = OAuth2Session(token=token)

    first_day = datetime.datetime.today().replace(day=1)
    next_first_day = (first_day + datetime.timedelta(days=32)).replace(day=1)

    # Configure query parameters to
    # modify the results
    query_params = {
        '$select': 'subject,organizer,start,end',
        '$orderby': 'start/dateTime ASC',
        '$filter': f'start/dateTime ge \'{first_day}\' and start/dateTime lt \'{next_first_day}\''
    }

    # Send GET to /me/events
    events = graph_client.get(
        '{0}/me/events'.format(graph_url), params=query_params)
    # Return the JSON result
    return events.json()
# </GetCalendarSnippet>
