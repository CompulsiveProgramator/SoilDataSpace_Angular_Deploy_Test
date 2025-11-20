import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesEditFormComponent } from './articles-edit-form.component';

describe('ArticlesEditFormComponent', () => {
  let component: ArticlesEditFormComponent;
  let fixture: ComponentFixture<ArticlesEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
