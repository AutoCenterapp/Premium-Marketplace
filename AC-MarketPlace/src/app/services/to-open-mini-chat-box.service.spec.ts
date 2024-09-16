import { TestBed } from '@angular/core/testing';

import { ToOpenMiniChatBoxService } from './to-open-mini-chat-box.service';

describe('ToOpenMiniChatBoxService', () => {
  let service: ToOpenMiniChatBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToOpenMiniChatBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
