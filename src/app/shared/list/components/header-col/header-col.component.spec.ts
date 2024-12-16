import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderColComponent } from './header-col.component';

describe('HeaderColComponent', () => {
  let component: HeaderColComponent;
  let fixture: ComponentFixture<HeaderColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderColComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
