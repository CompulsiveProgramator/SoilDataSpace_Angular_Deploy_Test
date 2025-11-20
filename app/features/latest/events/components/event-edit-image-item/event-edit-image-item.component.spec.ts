import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditImageItemComponent } from './event-edit-image-item.component';

describe('EventEditImageItemComponent', () => {
  let component: EventEditImageItemComponent;
  let fixture: ComponentFixture<EventEditImageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventEditImageItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventEditImageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
