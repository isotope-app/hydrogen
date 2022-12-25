import msgpack from 'msgpack-lite';
import { Buffer } from 'buffer';
import BaseEvent from './baseEvent';
import Events from './types/events';

class TerminationEvent extends BaseEvent {
  constructor(public reason: string) {
    super(Events.Termination);
    this.ready = true;
  }

  into(): Buffer {
    return Buffer.concat([
      this.magic,
      msgpack.encode({
        reason: this.reason,
      }),
    ]);
  }
}

export default TerminationEvent;
