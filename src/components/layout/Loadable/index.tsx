import { ComponentType, Suspense } from 'react';
import Loader from '../Loader';

function Loadable<T extends Record<string, unknown>>(
  Component: ComponentType<T>
): ComponentType<T> {
  return (props: T) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
}

export default Loadable;
