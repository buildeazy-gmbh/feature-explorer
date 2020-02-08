import React, {PropsWithChildren} from 'react';

import {theme} from '../../styles';

const t = theme({});

export const MainHeading = ({children}: PropsWithChildren<{}>) => (
  <h1
    style={{
      color: t.color.text.light,
      fontSize: t.fontSize.h1,
      fontWeight: 'normal',
      left: '50%',
      margin: 0,
      position: 'absolute',
      textShadow: '0 1px 4px rgba(0, 0, 0, 0.21)',
      top: t.size.default,
      transform: 'translateX(-50%)',
      whiteSpace: 'nowrap',
      zIndex: 1,
    }}
  >
    {children}
  </h1>
);

export const Main = ({children}: PropsWithChildren<{}>) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      flex: '1',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    {children}
  </div>
);

export const Sidebar = ({children}: PropsWithChildren<{}>) => (
  <div
    style={{
      boxSizing: 'border-box',
      display: 'flex',
      flex: '0 1 auto',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'flex-end',
      paddingBottom: t.size.default,
      paddingLeft: t.size.large,
      paddingRight: t.size.large,
      paddingTop: t.size.default,
    }}
  >
    {children}
  </div>
);

export const Page = ({children}: PropsWithChildren<{}>) => (
  <div
    style={{
      color: 'hsl(0, 0%, 64%)',
      display: 'flex',
      fontFamily: 'Roboto, sans-serif',
      fontSize: 14,
      height: '100vh',
      width: '100%',
    }}
  >
    {children}
  </div>
);
