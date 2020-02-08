export const SIZE: {
  height: number;
  width: number;
} = {
  height: 850,
  width: 1200,
};

export const RADIUS: number = SIZE.height / 2;

export const COLOR_SPACE = 'green-mint';

export const COMMON_PIE_PROPS = {
  cx: SIZE.width / 2,
  cy: (SIZE.height * 2) / 3,
  startAngle: 220,
  endAngle: -40,
  labelLine: false,
  animationDuration: 200,
  animationBegin: 0,
};

export const RADIAN = Math.PI / 180;
