import {Status} from '../modules/FeatureExplorer/types';

export const opacityByStatus = (status: Status): number => {
  switch (status) {
    case 'production':
      return 1;

    case 'development':
      return 0.34;

    default:
    case 'evaluation':
      return 0.13;
  }
};
