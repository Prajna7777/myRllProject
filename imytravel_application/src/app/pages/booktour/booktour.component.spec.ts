import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktourComponent } from './booktour.component';

describe('BooktourComponent', () => {
  let component: BooktourComponent;
  let fixture: ComponentFixture<BooktourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooktourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooktourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
