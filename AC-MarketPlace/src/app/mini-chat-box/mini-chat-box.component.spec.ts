import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniChatBoxComponent } from './mini-chat-box.component';

describe('MiniChatBoxComponent', () => {
  let component: MiniChatBoxComponent;
  let fixture: ComponentFixture<MiniChatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniChatBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
