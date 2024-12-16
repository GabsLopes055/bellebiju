import { Component, Input } from '@angular/core';
import { CardNumberPipe } from "../pipes/card-number/card-number.pipe";
import { MouthCardPipe } from "../pipes/mouth-card/mouth-card.pipe";
import { Cartao } from '../../models/professores.interface';

@Component({
    selector: 'tgt-credit-card-view',
    standalone: true,
    templateUrl: './credit-card-view.component.html',
    styleUrl: './credit-card-view.component.scss',
    imports: [CardNumberPipe, MouthCardPipe]
})
export class CreditCardViewComponent {

    @Input() cartao: Cartao = {
        cardNumber: '5445 8211 7845 1234',
        cardMouth: '20/10/2025',
        cardName: 'Jonathan L M Souza',
        cardCvv: '306',
        empresaId: 10
    }
}
