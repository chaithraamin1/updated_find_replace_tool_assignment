import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindReplace2Component } from './find-replace-2.component';

describe('FindReplace2Component', () => {
  let component: FindReplace2Component;
  let fixture: ComponentFixture<FindReplace2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindReplace2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindReplace2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
