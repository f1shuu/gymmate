import { useState } from 'react';

import Loader from './screens/Loader';
import NavigationBar from './components/navigators/NavigationBar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2500);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <NavigationBar />
      )}
    </>
  );
}
