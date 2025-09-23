import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
export default function TawkMessanger() {
  return (
    <TawkMessengerReact
      propertyId={import.meta.env.VITE_TAWK_CHAT_ID}
      widgetId="default"
    />
  );
}
