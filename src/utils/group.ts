import crypto from 'node:crypto';

class Group {
  ecdh: crypto.ECDH;

  constructor(public name: string, public accounts: string[]) {
    this.ecdh = crypto.createECDH('secp256k1');
  }

  setName(name: string) {
    this.name = name;
  }

  addMember(accounts: string[]) {
    this.accounts.push(...accounts.filter(a => !this.accounts.includes(a)));
  }

  removeMember(account: string) {
    this.accounts = this.accounts.filter(a => a !== account);
  }

  reset() {
    this.accounts = [];
    this.name = 'default';
  }
}

export default Group;
