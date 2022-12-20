import BaseEvent from './baseEvent';
import Events from './types/events';

class TerminationEvent extends BaseEvent {
  constructor() {
    super(Events.Termination);
  }

  into(): Buffer {
    return this.magic;
  }
}

export default TerminationEvent;
