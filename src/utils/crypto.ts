import webcrypto from 'crypto';
import { Buffer } from 'buffer';
import nacl from 'tweetnacl';
import { decodeBase64, encodeBase64, decodeUTF8 } from 'tweetnacl-util';
import EthereumProvider from '../types/provider.js';

// https://github.com/MetaMask/eth-sig-util/blob/main/src/encryption.ts
const encryptData = (publicKey: string | Buffer, data: string | Buffer) => {
  const ephemeralKeyPair = nacl.box.keyPair();
  const nonce = nacl.randomBytes(nacl.box.nonceLength);

  // Encrypt
  const encryptedMessage = nacl.box(
    data instanceof Buffer ? data : decodeUTF8(data),
    nonce,
    publicKey instanceof Buffer ? publicKey : decodeBase64(publicKey),
    ephemeralKeyPair.secretKey
  );

  const output = {
    version: 'x25519-xsalsa20-poly1305',
    nonce: encodeBase64(nonce),
    ephemPublicKey: encodeBase64(ephemeralKeyPair.publicKey),
    ciphertext: encodeBase64(encryptedMessage),
  };

  // Return encrypted msg data
  return Buffer.from(JSON.stringify(output));
};

const decryptData = (windowEth: EthereumProvider, data: Buffer, address: string) =>
  windowEth.request({
    method: 'eth_decrypt',
    params: [data, address],
  });

const signMessage = async (message: string, account: string) => {
  const messageHash = await window.ethereum.request({
    method: 'web3_sha3',
    params: [`0x${Buffer.from(message).toString('hex')}`],
  });

  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [messageHash, account],
  });

  return { messageHash, signature };
};

const checkSignature = async (messageHash: string, signature: string, expectedKey: string) => {
  const recoveredKey = await window.ethereum.request({
    method: 'personal_ecRecover',
    params: [messageHash, signature],
  });
  return recoveredKey === expectedKey;
};

const calculateMAC = (key: string, content: string) => {
  const iv = webcrypto.randomBytes(16);
  const cipher = webcrypto.createCipheriv('aes-128-gcm', key, iv);
  let mac = cipher.update(content, 'utf-8', 'hex');
  mac += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return {
    iv: iv.toString('hex'),
    mac,
    authTag,
  };
};

const validateMAC = (key: string, content: string, iv: string, mac: string, authTag: string) => {
  const decipher = webcrypto.createDecipheriv('aes-128-gcm', key, iv);
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(mac, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted === content;
};

export { encryptData, decryptData, signMessage, checkSignature, calculateMAC, validateMAC };
