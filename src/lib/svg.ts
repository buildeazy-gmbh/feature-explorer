import {RADIAN} from '../constants';

const fixAngle = (angle: number): number => (angle < 0 ? 360 + angle : angle);

/**
 * Get absolute coordinates of a point at a given angle and radius from the center
 *
 * @param   {num}   centerX         Center x coordinate
 * @param   {num}   centerY         Center y coordinate
 * @param   {num}   radius          Radius from the center
 * @param   {num}   angleInDegrees  Angle from the center
 *
 * @return  {Object}                Object with Cartesian x and y coordinates
 */
const polar2Cartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
  goesThroughZero: boolean
): {
  x: number;
  y: number;
} => {
  const angleInRadians = angleInDegrees * RADIAN;
  const direction = {
    x: angleInDegrees > 0 || angleInDegrees < 180 ? 1 : -1,
    y: (angleInDegrees > 0 || angleInDegrees < 180 ? 1 : -1) * (goesThroughZero ? 1 : -1),
  };

  return {
    x: centerX + radius * Math.cos(angleInRadians) * direction.x,
    y: centerY + radius * Math.sin(angleInRadians) * direction.y,
  };
};

export const describeArc = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  // I need a few really nasty hacks to make the position and sweeping work properly.
  // Those are more brute force than anything else...
  // HACKZ START
  const offset = 5;
  const sa = fixAngle(startAngle);
  const ea = fixAngle(endAngle);
  const goesThroughZero = ea < sa && ea > 180;
  // HACKZ END

  const start = polar2Cartesian(centerX, centerY, radius, sa, goesThroughZero);
  const end = polar2Cartesian(centerX, centerY, radius, ea, goesThroughZero);
  const rotation = 0;
  const largeArc = 0; // always draw a short arc
  const sweep = 1; // always make arc sweep to the right

  let d = [
    'M',
    end.x + offset,
    end.y + offset,
    'A',
    radius,
    radius,
    rotation,
    largeArc,
    sweep,
    start.x + offset,
    start.y + offset,
  ];

  return d.join(' ');
};
