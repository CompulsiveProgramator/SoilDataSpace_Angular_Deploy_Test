import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesGridCardComponent } from './articles-grid-card.component';

describe('ArticlesGridCardComponent', () => {
  let component: ArticlesGridCardComponent;
  let fixture: ComponentFixture<ArticlesGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesGridCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
