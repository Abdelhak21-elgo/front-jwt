import { DomSanitizer } from '@angular/platform-browser';
import { DragDirective } from './drag.directive';

describe('DragDirective', () => {
  it('should create an instance', () => {
    let sanitizer! : DomSanitizer;
    const directive = new DragDirective(sanitizer);
    expect(directive).toBeTruthy();
  });
});
