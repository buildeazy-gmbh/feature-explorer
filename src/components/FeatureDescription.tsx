import React from 'react';

type Props = {
  active: boolean;
  payload: any; // TODO: get from recharts types
};

export const FeatureDescription = ({active, payload}: Props) => {
  if (!payload?.[0]?.payload?.feature) {
    return null;
  }

  if (active) {
    return (
      <div className="custom-tooltip">
        <strong>{payload[0].payload.feature}</strong>
        <p className="intro">{payload[0].payload.description}</p>
      </div>
    );
  }

  return null;
};
