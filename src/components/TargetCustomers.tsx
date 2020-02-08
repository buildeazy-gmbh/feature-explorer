import React, {memo, PropsWithChildren} from 'react';

export const TargetCustomers = memo(({children}: PropsWithChildren<{}>) => (
  <div
    style={{
      left: '50%',
      position: 'absolute',
      textAlign: 'center',
      textShadow: '0 1px 4px rgba(0, 0, 0, 0.21)',
      top: '66%',
      transform: 'translate(-50%, -52%)',
    }}
  >
    for
    <h2
      style={{
        color: 'hsl(0, 0%, 85%)',
        fontSize: 28,
        fontWeight: 'bold',
        margin: '3px 0 4px',
      }}
    >
      {children}
    </h2>
    customers
  </div>
));
