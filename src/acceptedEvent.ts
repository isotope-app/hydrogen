import msgpack from 'msgpack-lite';
import { Buffer } from 'buffer';
import BaseEvent from './baseEvent.js';
import JoinEvent from './joinEvent.js';
import Group from './utils/group.js';
import Events from './types/events.js';
import { calculateMAC, checkSignature, encryptData, signMessage } from './utils/crypto.js';

class AcceptedEvent extends BaseEvent {
  groupKey?: string;

  mac?: string;

  authTag?: string;

  iv?: string;

  signature?: string;

  messageHash?: string;

  constructor(public joinEvent: JoinEvent, public group: Group, public address: string) {
    super(Events.Accepted);
  }

  async checkIdentity() {
    const { id, signature, messageHash, publicKey } = this.joinEvent;
    if (id !== 0) throw Error('ID field is not zero(0).');
    if (await checkSignature(messageHash!, signature!, publicKey)) throw Error('Signature check failed.');
  }

  updateGroupKey() {
    this.groupKey = this.group.ecdh.computeSecret(Buffer.from(this.joinEvent.publicKey, 'base64')).toString('hex');
  }

  async createSignature() {
    const { messageHash, signature } = await signMessage('JoinEvent', this.address);

    this.messageHash = messageHash as string;
    this.signature = signature as string;
  }

  createMAC() {
    const { mac, authTag, iv } = calculateMAC(this.groupKey!, this.groupKey!);
    this.mac = mac;
    this.authTag = authTag;
    this.iv = iv;
  }

  into(): Buffer {
    if (!this.ready) throw Error('Event not initialized.');
    const res = Buffer.concat([
      this.magic,
      msgpack.encode({
        groupKey: this.groupKey,
        mac: this.mac,
        authTag: this.authTag,
        signature: this.signature,
        messageHash: this.messageHash,
        iv: this.iv,
      }),
    ]);
    return encryptData(this.joinEvent.publicKey, res);
  }

  async init() {
    await this.checkIdentity();
    this.updateGroupKey();
    await this.createSignature();
    this.createMAC();
    this.ready = true;
  }
}

export default AcceptedEvent;
