import msgpack from 'msgpack-lite';
import { Buffer } from 'buffer';
import BaseEvent from './baseEvent.js';
import Events from './types/events.js';
import { signMessage } from './utils/crypto.js';

class JoinEvent extends BaseEvent {
  id = 0; // uhh probably will fix this soon

  signature?: string;

  messageHash?: string;

  constructor(public address: string, public publicKey: string) {
    super(Events.Join);
  }

  async init() {
    const { messageHash, signature } = await signMessage('JoinEvent', this.address);

    this.messageHash = messageHash as string;
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
        messageHash: this.messageHash,
        signature: this.signature,
        id: this.id,
      }),
    ]);
  }
}

export default JoinEvent;
