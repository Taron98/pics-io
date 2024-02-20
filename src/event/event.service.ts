/** @format */
import { EventType, getData, postData, putData } from '../common';

export class EventService {
  private Destinations = [
    {
      name: 'destination1',
      url: 'http://example.com/endpoint',
      transport: 'http.post',
    },
    {
      name: 'destination2',
      url: 'http://example2.com/endpoint',
      transport: 'http.put',
    },
    {
      name: 'destination3',
      url: 'http://example3.com/endpoint',
      transport: 'http.get',
    },
    {
      name: 'destination4',
      transport: 'console.log',
    },
  ];
  private Actions = {
    'http.post': {
      action: postData,
      params: 'AXIOS,',
    },
    'http.put': {
      action: putData,
      params: 'AXIOS',
    },
    'http.get': {
      action: getData,
      params: 'AXIOS',
    },
    'console.log': {
      action: console.log,
      type: 'CONSOLE',
    },
    'console.watrn': {
      action: console.warn,
      type: 'CONSOLE',
    },
  };
  async handle(data: EventType) {
    const { possibleDestinations, payload, strategy = 'ALL' } = data;
    const response = this.decideForAll(possibleDestinations);
    for (const key in response) {
      let destination = this.Destinations.find(item => item.name === key);
      if (!destination) {
        response[key] = false;
        console.log(`UnknownDestinationError ${key}`);
      } else if (response[key]) {
        let action = this.Actions[destination.transport];
        if (action['type'] === 'CONSOLE') {
          await action['action'](payload);
        } else {
          await action['action'](destination.url, payload);
        }
      }
    }
    return response;
  }
  strategyDecider() {}
  decideForAll(data) {
    let obj = {};

    for (const item of data) {
      for (const destination in item) {
        obj[destination] = item[destination];
      }
    }
    return obj;
  }
  decideForAny(possibleDestinations) {
    const result = {};

    for (const destination of possibleDestinations) {
      for (const key in destination) {
        if (destination.hasOwnProperty(key)) {
          result[key] = result[key] || destination[key];
        }
      }
    }

    return result;
  }
  decideForCustom(possibleDestinations, funcResponse: boolean) {
    const result = {};

    for (const destination of possibleDestinations) {
      for (const key in destination) {
        result[key] = funcResponse;
      }
    }
  }
}
