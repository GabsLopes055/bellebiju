import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoAprovacaoComponent } from './solicitacao-aprovacao.component';

describe('SolicitacaoAprovacaoComponent', () => {
  let component: SolicitacaoAprovacaoComponent;
  let fixture: ComponentFixture<SolicitacaoAprovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoAprovacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitacaoAprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
