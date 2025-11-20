import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressGridComponent } from './congress-grid.component';

describe('CongressGridComponent', () => {
  let component: CongressGridComponent;
  let fixture: ComponentFixture<CongressGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongressGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongressGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
