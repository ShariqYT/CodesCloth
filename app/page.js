import Home from '@/components/Home'
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'CodesCloth - Wearable Codes',
};

export default function Page() {
  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Home />
    </>
  );
}
