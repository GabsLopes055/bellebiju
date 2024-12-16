import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsSelectsComponent } from './chips-selects.component';

describe('ChipsSelectsComponent', () => {
  let component: ChipsSelectsComponent;
  let fixture: ComponentFixture<ChipsSelectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsSelectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChipsSelectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
