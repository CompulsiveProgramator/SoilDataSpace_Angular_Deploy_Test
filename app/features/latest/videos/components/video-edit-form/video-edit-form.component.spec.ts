import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEditFormComponent } from './video-edit-form.component';

describe('VideoEditFormComponent', () => {
  let component: VideoEditFormComponent;
  let fixture: ComponentFixture<VideoEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
