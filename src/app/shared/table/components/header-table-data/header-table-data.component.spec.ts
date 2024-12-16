import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTableDataComponent } from './header-table-data.component';

describe('HeaderTableDataComponent', () => {
  let component: HeaderTableDataComponent;
  let fixture: ComponentFixture<HeaderTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTableDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
