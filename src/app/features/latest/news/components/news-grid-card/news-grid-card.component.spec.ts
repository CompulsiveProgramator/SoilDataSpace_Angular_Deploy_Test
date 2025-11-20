import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsGridCardComponent } from './news-grid-card.component';

describe('NewsGridCardComponent', () => {
  let component: NewsGridCardComponent;
  let fixture: ComponentFixture<NewsGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsGridCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
