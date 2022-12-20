import BaseEvent from './baseEvent';
import Events from './types/events';

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
