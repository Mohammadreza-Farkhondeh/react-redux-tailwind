import { Suspense } from 'react';
import { LoadingScreen } from './loader';

export const Loadable =
  (Component: React.LazyExoticComponent<() => JSX.Element>) => (props: any) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };
