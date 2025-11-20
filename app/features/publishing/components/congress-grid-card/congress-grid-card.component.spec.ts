import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressGridCardComponent } from './congress-grid-card.component';

describe('CongressGridCardComponent', () => {
  let component: CongressGridCardComponent;
  let fixture: ComponentFixture<CongressGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongressGridCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongressGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
