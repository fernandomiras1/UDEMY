import { TestBed, async } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService],
    });

    loggerService = TestBed.get(LoggerService);
  }));

  it('should log without errors', (() => {
    expect(LoggerService.error('This is an error')).toBeUndefined();
    expect(LoggerService.log('This is a log')).toBeUndefined();
  }));
});
