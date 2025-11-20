import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTableItemComponent } from './provider-table-item.component';

describe('ProviderTableItemComponent', () => {
  let component: ProviderTableItemComponent;
  let fixture: ComponentFixture<ProviderTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderTableItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
