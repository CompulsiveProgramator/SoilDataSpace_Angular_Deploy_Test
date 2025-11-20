import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPageComponent } from './provider-page.component';

describe('ProviderPageComponent', () => {
  let component: ProviderPageComponent;
  let fixture: ComponentFixture<ProviderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
