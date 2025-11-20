import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersCarrouselComponent } from './partners-carrousel.component';

describe('PartnersCarrouselComponent', () => {
  let component: PartnersCarrouselComponent;
  let fixture: ComponentFixture<PartnersCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartnersCarrouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
