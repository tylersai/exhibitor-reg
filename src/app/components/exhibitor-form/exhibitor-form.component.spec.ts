import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitorFormComponent } from './exhibitor-form.component';

describe('ExhibitorFormComponent', () => {
  let component: ExhibitorFormComponent;
  let fixture: ComponentFixture<ExhibitorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
