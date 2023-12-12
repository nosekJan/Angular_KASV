import { FormControl } from '@angular/forms';

export function priceFormatValidator(control: FormControl): { [key: string]: any } | null {
  const validFormat = /^\d+(\.\d{1,2})?$/; // Regular expression for '00.00' format

  if (control.value && !validFormat.test(control.value)) {
    return { 'invalidFormat': true };
  }
  return null;
}

