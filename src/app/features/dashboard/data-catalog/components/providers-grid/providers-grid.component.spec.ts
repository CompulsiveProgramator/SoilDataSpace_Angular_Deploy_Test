import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersGridComponent } from './providers-grid.component';

describe('ProvidersGridComponent', () => {
  let component: ProvidersGridComponent;
  let fixture: ComponentFixture<ProvidersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvidersGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
