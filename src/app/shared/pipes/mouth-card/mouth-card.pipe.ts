import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mouthCard',
  standalone: true
})
export class MouthCardPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value || typeof value !== 'string' || value.length !== 4) return value;

    return value.substring(0, 2) + '/' + value.substring(2, 4);
  }

}
