import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderListPageComponent } from './provider-list-page.component';

describe('ProviderListPageComponent', () => {
  let component: ProviderListPageComponent;
  let fixture: ComponentFixture<ProviderListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
