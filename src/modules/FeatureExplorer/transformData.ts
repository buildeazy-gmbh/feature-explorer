import {Feature, Status} from './types';

export const transformData = (data: Feature[]) => {
  const featuresData = data.map(({group, name: feature, status}) => ({
    count: 1,
    feature,
    group,
    status,
  }));

  const featureGroupsData = Array.from(new Set(data.map(it => it.group)))
    .filter(Boolean)
    .map(group => ({
      group,
      featuresCount: data.filter(it => it.group === group).length,
    }));

  return {
    featuresData,
    featureGroupsData,
  };
};

export const uniqueFeatureGroups = (features: Feature[], groupOrder: string[]): string[] =>
  Array.from(new Set(features.map(it => it.group)))
    .filter(Boolean)
    .sort((a, b) => {
      if (groupOrder?.length) {
        const g = groupOrder.indexOf(a) - groupOrder.indexOf(b);
        if (g > 0) {
          return 1;
        } else if (g < 0) {
          return -1;
        }
      } else {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }
      }
      return 0;
    });

export const uniqueStatus = (features: Feature[], statusOrder: Status[]): Status[] =>
  Array.from(new Set(features.map(({status}) => status)))
    .filter(Boolean)
    .sort((a, b) => {
      const s = statusOrder.indexOf(a) - statusOrder.indexOf(b);
      if (s > 0) {
        return 1;
      } else if (s < 0) {
        return -1;
      } else {
        return 0;
      }
    });

export const getCustomerSegments = (data: Feature[]): string[] =>
  Array.from(
    new Set(
      data.reduce((acc, cur: any) => {
        return acc.concat(cur.customers);
      }, [])
    )
  )
    .filter(Boolean)
    .sort();
