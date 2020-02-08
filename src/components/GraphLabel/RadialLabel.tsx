import React, {memo} from 'react';

import {RADIAN} from '../../constants';
import {truncate} from '../../lib';
import {theme} from '../../styles';

const t = theme({});

type Props = {
  colorFunc: (name: string) => string;
  cx: number;
  cy: number;
  group: string;
  midAngle: number;
  name: string;
  outerRadius: number;
};

export const RadialLabel = memo(({colorFunc, cx, cy, group, midAngle, name, outerRadius}: Props) => {
  // Position of label.
  const offset = 14;
  const x = cx + (outerRadius + offset) * Math.cos(-midAngle * RADIAN);
  const y = cy + (outerRadius + offset) * Math.sin(-midAngle * RADIAN);
  // Calculate required translation relative to center of label (50% height / width).
  const labelCenter = 50;
  const tx = `${(Math.cos(-midAngle * RADIAN) * labelCenter).toFixed()}%`;
  const ty = `${(Math.sin(-midAngle * RADIAN) * labelCenter).toFixed()}%`;

  let textAnchor = 'middle';
  let transformOrigin = 'bottom';
  if (midAngle > 91) {
    textAnchor = 'end';
    transformOrigin = 'right';
  }
  if (midAngle < 89) {
    textAnchor = 'start';
    transformOrigin = 'left';
  }

  return (
    <g
      style={{
        transform: `translate(${tx}, ${ty})`,
        transformBox: 'fill-box',
        transformOrigin,
      }}
    >
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fill={colorFunc(group)}
        style={{
          fontSize: t.fontSize.small,
          transform: `rotate(${(midAngle - (midAngle < 90 ? 0 : 180)) * -1}deg)`,
          transformBox: 'fill-box',
          transformOrigin,
        }}
      >
        {truncate(name)}
      </text>
    </g>
  );
});
