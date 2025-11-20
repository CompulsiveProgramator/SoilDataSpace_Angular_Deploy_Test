import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPageComponent } from './latest-page.component';

describe('LatestPageComponent', () => {
  let component: LatestPageComponent;
  let fixture: ComponentFixture<LatestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
