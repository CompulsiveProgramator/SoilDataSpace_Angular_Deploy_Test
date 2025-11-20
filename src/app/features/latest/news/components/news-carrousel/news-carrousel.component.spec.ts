import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCarrouselComponent } from './news-carrousel.component';

describe('NewsCarrouselComponent', () => {
  let component: NewsCarrouselComponent;
  let fixture: ComponentFixture<NewsCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsCarrouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
