import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardViewComponent } from './credit-card-view.component';

describe('CreditCardViewComponent', () => {
  let component: CreditCardViewComponent;
  let fixture: ComponentFixture<CreditCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
