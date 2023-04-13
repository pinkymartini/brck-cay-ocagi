import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecaseTurkish'
})
export class TitleCaseTurkishPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return null;
    let words = value.split(' ');
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].toLocaleLowerCase('tr-TR');
      words[i] = words[i].charAt(0).toLocaleUpperCase('tr-TR') + words[i].slice(1);
    }
    return words.join(' ');
  }
}