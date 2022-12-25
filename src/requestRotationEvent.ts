import BaseEvent from './baseEvent.js';
import Events from './types/events.js';

class RequestRotationEvent extends BaseEvent {
  constructor() {
    super(Events.RequestRotation);
    this.ready = true;
  }

  into(): Buffer {
    return this.magic;
  }
}

export default RequestRotationEvent;
