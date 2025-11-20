import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditFormComponent } from './news-edit-form.component';

describe('NewsEditFormComponent', () => {
  let component: NewsEditFormComponent;
  let fixture: ComponentFixture<NewsEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
