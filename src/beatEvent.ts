import BaseEvent from './baseEvent.js';
import Events from './types/events.js';

class BeatEvent extends BaseEvent {
  constructor() {
    super(Events.Beat);
    this.ready = true;
  }

  into(): Buffer {
    return this.magic;
  }
}

export default BeatEvent;
