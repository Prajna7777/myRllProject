import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittourComponent } from './edittour.component';

describe('EdittourComponent', () => {
  let component: EdittourComponent;
  let fixture: ComponentFixture<EdittourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdittourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
