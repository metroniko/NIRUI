import {EventEmitter} from '@angular/core';

export class ShareService {

  onClick: EventEmitter<string> = new EventEmitter();

   doClick(tacticName) {
    this.onClick.emit(tacticName);
  }
}
