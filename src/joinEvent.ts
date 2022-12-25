import msgpack from 'msgpack-lite';
import { Buffer } from 'buffer';
import BaseEvent from './baseEvent';
import Events from './types/events';
import { signMessage } from './utils/crypto';

class JoinEvent extends BaseEvent {
  id = 0; // uhh probably will fix this soon

  signature?: string;

  signedMessage?: string;

  constructor(public address: string, public publicKey: string) {
    super(Events.Join);
  }

  async init() {
    const { signedMessage, signature } = await signMessage('JoinEvent', this.address);

    this.signedMessage = signedMessage;
    this.signature = signature as string;
    this.ready = true;
  }

  into(): Buffer {
    if (!this.ready) throw Error('Event not initialized.');
    return Buffer.concat([
      this.magic,
      msgpack.encode({
        publicKey: this.publicKey,
        address: this.address,
        signedMessage: this.signedMessage,
        signature: this.signature,
        id: this.id,
      }),
    ]);
  }
}

export default JoinEvent;
