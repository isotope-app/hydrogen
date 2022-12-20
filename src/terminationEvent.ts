import BaseEvent from './baseEvent';
import Events from './types/events';

class TerminationEvent extends BaseEvent {
  constructor() {
    super(Events.Termination);
    this.ready = true;
  }

  into(): Buffer {
    return this.magic;
  }
}

export default TerminationEvent;
