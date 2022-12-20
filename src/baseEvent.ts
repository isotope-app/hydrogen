abstract class BaseEvent {
  ready = false;

  constructor(public magic: Buffer) {}

  abstract into(): Buffer;

  init(): void {
    this.ready = true;
  }
}

export default BaseEvent;
