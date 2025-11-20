import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressEditFormComponent } from './congress-edit-form.component';

describe('CongressEditFormComponent', () => {
  let component: CongressEditFormComponent;
  let fixture: ComponentFixture<CongressEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongressEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongressEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
