import React, {memo} from 'react';

import {SIZE} from '../../constants';
import {describeArc} from '../../lib';

type Props = {
  colorFunc: (name: string) => string;
  endAngle: number;
  index: number;
  name: string;
  outerRadius: number;
  startAngle: number;
};

export const CurvedLabel = memo(({colorFunc, endAngle, index, name, outerRadius, startAngle}: Props) => {
  const offset = -21;
  const centerX = SIZE.width / 2;
  const centerY = (SIZE.height * 2) / 3;
  const radius = outerRadius + offset;
  const arc = describeArc(centerX, centerY, radius, endAngle, startAngle);

  return (
    <>
      <defs>
        <path id={`group-label-arc-${index}`} d={arc} />
      </defs>
      <text dominantBaseline="central" textAnchor="middle" fill={colorFunc(name)}>
        <textPath xlinkHref={`#group-label-arc-${index}`} startOffset="50%">
          {name}
        </textPath>
      </text>
    </>
  );
});
