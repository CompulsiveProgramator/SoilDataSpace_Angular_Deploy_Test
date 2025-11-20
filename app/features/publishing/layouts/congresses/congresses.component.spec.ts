import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressesComponent } from './congresses.component';

describe('CongressesComponent', () => {
  let component: CongressesComponent;
  let fixture: ComponentFixture<CongressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongressesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
