import BaseEvent from './baseEvent';
import Events from './types/events';

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
