import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from "luxon";

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  
  
  transform(value: string | DateTime | null, format: string = 'DDDD', locale: string = 'es'): string {
    // Default format is  => lunes, 1 de enero de 2000 ... in EN locale => Monday, January 1, 2000
    // Blacklist of words that should not be capitalized
    const lowerCaseWords = ['de', 'y', 'en', 'a', 'in', 'of'];
    
    if (!value) return '';
    const date = typeof value === 'string' ? DateTime.fromISO(value, {locale}) : value?.setLocale(locale);
    
    if (date?.isValid) {
      const formattedDate = date.toFormat(format);
      
      if(locale === 'es') {
        // Capitalize words
        return formattedDate.split(' ')
          .map(word =>
            lowerCaseWords.includes(word)
              ? word
              : word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      return formattedDate;
    }
    
    return '';
  }
}
