import React, {PropsWithChildren} from 'react';

import {theme} from '../../styles';

const t = theme({});

export const Label = ({children}: PropsWithChildren<{}>) => (
  <div
    style={{
      display: 'inline-block',
      userSelect: 'none',
      verticalAlign: 'middle',
    }}
  >
    {children}
  </div>
);

export const LegendKey = ({background}: {background: string}) => (
  <span
    style={{
      background,
      borderRadius: 1,
      display: 'inline-block',
      height: t.size.default,
      marginRight: t.size.small,
      verticalAlign: 'middle',
      width: t.size.default,
    }}
  />
);

export const Option = ({
  children,
  isNotSelected,
  onClick,
}: PropsWithChildren<{
  isNotSelected: boolean;
  onClick: () => void;
}>) => (
  <div
    onMouseDown={onClick}
    style={{
      cursor: 'pointer',
      opacity: isNotSelected ? 0.26 : 1,
      padding: t.size.small,
      transition: 'opacity 200ms ease-out',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

export const SectionHeading = ({children}: PropsWithChildren<{}>) => (
  <h3
    style={{
      color: t.color.text.light,
      fontSize: t.fontSize.h3,
      fontWeight: 'bold',
      marginBottom: t.size.small,
      marginTop: t.size.large,
      userSelect: 'none',
    }}
  >
    {children}
  </h3>
);
