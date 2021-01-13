import {EventEmitter} from '@angular/core';
import {IStrategy} from '../entities/IStrategy';

export class GetStrategyInformationService {
  onClick: EventEmitter<IStrategy> = new EventEmitter();

  getInfo(strategy: IStrategy) {
    this.onClick.emit(strategy);
  }
}
