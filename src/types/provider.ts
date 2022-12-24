// https://docs.metamask.io/guide/ethereum-provider.html

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

type EventTypes = 'accountsChanged' | 'chainChanged' | 'connect' | 'disconnect' | 'message';

interface EthereumProvider {
  isConnected: () => boolean;
  request: (args: RequestArguments) => Promise<unknown>;
  on: (event: EventTypes, callback: (args: unknown) => void) => void;
  removeListener: (event: EventTypes, callback: (args: unknown) => void) => void;
  _metamask: {
    isUnlocked: () => boolean;
  }
};

export default EthereumProvider;