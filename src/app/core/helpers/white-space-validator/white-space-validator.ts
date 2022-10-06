import {AbstractControl, ValidationErrors} from "@angular/forms";

export  default (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }

  let hasErrors = false;

  if (!control.value.trim()) {
    hasErrors = true;
  }

  if (hasErrors) {
    return {onlyWhitespacesValidator: true};
  }

  return null;
}
