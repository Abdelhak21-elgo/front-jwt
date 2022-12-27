import { TestBed } from '@angular/core/testing';

import { ImageProessingService } from './image-proessing.service';

describe('ImageProessingService', () => {
  let service: ImageProessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
