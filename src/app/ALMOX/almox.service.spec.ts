/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlmoxService } from './almox.service';

describe('Service: Almox.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlmoxService]
    });
  });

  it('should ...', inject([AlmoxService], (service: AlmoxService) => {
    expect(service).toBeTruthy();
  }));
});
