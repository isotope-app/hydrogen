import msgpack from 'msgpack-lite';
import BaseEvent from './baseEvent';
import Events from './types/events';
import { calculateMAC, encryptData, signMessage } from './utils/crypto';
import Group from './utils/group';

class MessageEvent extends BaseEvent {
  signedMessage?: string;

  signature?: string;

  mac?: string;

  authTag?: string;

  iv?: string;

  publicKey: string;

  timestamp?: number;

  constructor(public address: string, public content: string, public group: Group) {
    super(Events.MessageEvent);

    this.publicKey = this.group.ecdh.getPublicKey().toString('hex');
  }

  async createSignature() {
    const { signedMessage, signature } = await signMessage(this.content, this.address);
    this.signedMessage = signedMessage;
    this.signature = signature;
  }

  createMAC() {
    const { mac, authTag, iv } = calculateMAC(this.publicKey, this.publicKey);
    this.mac = mac;
    this.authTag = authTag;
    this.iv = iv;
  }

  into(): Buffer {
    if (!this.ready) throw Error('Event not initialized.');

    return encryptData(
      this.publicKey,
      Buffer.concat([
        this.magic,
        msgpack.encode({
          address: this.address,
          publicKey: this.publicKey,
          content: this.content,
          signedMessage: this.signedMessage,
          signature: this.signature,
          mac: this.mac,
          authTag: this.authTag,
          iv: this.iv,
        }),
      ])
    );
  }

  async init() {
    await this.createSignature();
    this.createMAC();
    this.timestamp = Date.now();
    this.ready = true;
  }
}

export default MessageEvent;
