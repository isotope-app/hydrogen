import { createRef } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import WebSocketAsPromised from 'websocket-as-promised';
import { account, JoinEvent } from '../../dist';

export function App() {
  const addressRef = createRef<HTMLInputElement>();
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [publicKey, setPublicKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const address = ((await account.requestAccounts()) as string[])[0];
      const publicKey = (await account.requestKeys(address)) as string;
      setAddress(address);
      setPublicKey(publicKey);
    })();
  }, []);

  const sendJoinEvent = async () => {
    // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
    if (!addressRef.current?.value || !address || !publicKey) return;
    const wsp = new WebSocketAsPromised(addressRef.current.value);
    await wsp.open();

    const joinEvent = new JoinEvent(address, publicKey);
    await joinEvent.init();
    wsp.send(joinEvent.into());
  };

  return (
    <>
      <input type="text" placeholder="ws server address" ref={addressRef} value="ws://localhost:8080" />
      <button onClick={sendJoinEvent}>Send JoinEvent</button>
    </>
  );
}
