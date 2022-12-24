// computed enums will be added in ts v5.0.0
// https://github.com/microsoft/TypeScript/pull/50528
// so we will use a fake enum for now

import { Buffer } from 'buffer';

const Events = {
  Null: Buffer.from([0x00]),
  Join: Buffer.from([0x05]),
  Accepted: Buffer.from([0x06]),
  Termination: Buffer.from([0x24]),
  RequestRotation: Buffer.from([0x16]),
  Beat: Buffer.from([0x07]),
  MessageEvent: Buffer.from([0x02]),
};

export default Events;
