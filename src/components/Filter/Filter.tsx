import React, {memo, useCallback, useState} from 'react';

import {Label, LegendKey, Option, SectionHeading} from './Components';

type Props = {
  heading: string;
  itemColorFunc: (item: string) => string;
  items: string[];
  onClick: (item: string) => void;
};

export const Filter = memo(({heading, itemColorFunc, items, onClick}: Props) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = useCallback(
    item => {
      setSelectedItem(item === selectedItem ? null : item);
      onClick(item);
    },
    [onClick, selectedItem, setSelectedItem]
  );

  return (
    <section>
      <SectionHeading>{heading}</SectionHeading>
      {items.map(it => (
        <Option key={it} isNotSelected={Boolean(selectedItem && it !== selectedItem)} onClick={() => handleClick(it)}>
          {itemColorFunc && <LegendKey background={itemColorFunc(it)} />}
          <Label>{it}</Label>
        </Option>
      ))}
    </section>
  );
});
