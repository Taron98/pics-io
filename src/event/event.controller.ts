/** @format */
import { Body, Controller, Post, Route, SuccessResponse, Tags, Request, Security } from 'tsoa';
import { EventService } from './event.service';
import { validate } from '../common';
import { eventJoi } from './event.validation';
import { EventType } from '../common';
import { LogService } from '../log/log.service';
import express from 'express';
@Route('event')
@Tags('Event')
export class EventController extends Controller {
  private eventService: EventService;
  private logService: LogService;
  constructor() {
    super();
    this.eventService = new EventService();
    this.logService = new LogService();
  }
  @SuccessResponse('201', 'Event')
  @Security('jwt')
  @Post('')
  public async event(
    @Body()
    reqBody: EventType,
  ): Promise<any> {
    const { _id } = await this.logService.log({ request: { body: reqBody } });
    validate(reqBody, eventJoi());
    const response = await this.eventService.handle(reqBody);
    await this.logService.updateOne({ _id }, { response });
    return response;
  }
}
