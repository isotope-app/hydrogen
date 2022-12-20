import BaseEvent from './baseEvent';
import JoinEvent from './joinEvent';
import Group from './utils/group';
import Events from './types/events';

class AcceptedEvent extends BaseEvent {
  constructor(public joinEvent: JoinEvent, public group: Group) {
    super(Events.Accepted);
    this.checkIdentity();
  }

  checkIdentity() {
    if (this.joinEvent.id !== 0) throw Error('ID field is not zero(0).');
  }

  into(): Buffer {
    throw Error(this.ready.toString()); // TODO
  }
}

export default AcceptedEvent;
