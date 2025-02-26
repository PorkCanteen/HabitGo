import { ComponentType, FC, LazyExoticComponent, Suspense } from 'react'
import { Loading } from 'react-vant';
import React from 'react';

type LazyImportProps = {
  lazy?: LazyExoticComponent<ComponentType>
}

const LazyImport: FC<LazyImportProps> = ({ lazy }) => {
  const Component = lazy ? lazy : () => null
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}

export default LazyImport
