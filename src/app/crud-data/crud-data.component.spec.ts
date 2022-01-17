import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDataComponent } from './crud-data.component';

describe('CrudDataComponent', () => {
  let component: CrudDataComponent;
  let fixture: ComponentFixture<CrudDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
