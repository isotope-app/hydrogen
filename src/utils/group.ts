import webcrypto from 'crypto';

class Group {
  ecdh: webcrypto.ECDH;

  constructor(public name: string, public accounts: string[]) {
    this.ecdh = webcrypto.createECDH('Curve25519');
  }

  setName(name: string) {
    this.name = name;
  }

  addMember(accounts: string[]) {
    this.accounts.push(...accounts.filter((a) => !this.accounts.includes(a)));
  }

  removeMember(account: string) {
    this.accounts = this.accounts.filter((a) => a !== account);
  }

  reset() {
    this.accounts = [];
    this.name = 'default';
  }
}

export default Group;
