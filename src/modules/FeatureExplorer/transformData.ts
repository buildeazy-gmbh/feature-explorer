import {allCustomerSegments, statusOrder} from '../../constants';

import {Feature, Filters, Status} from './types';

export const uniqueFeatureGroups = (features: Feature[], groupOrder: string[]): string[] => {
  const fg = Array.from(new Set(features.map(it => it.group))).filter(Boolean);

  return fg.length
    ? fg.sort((a, b) => {
        if (groupOrder?.length) {
          const g = groupOrder.indexOf(a) - groupOrder.indexOf(b);
          if (g > 0) {
            return 1;
          } else if (g < 0) {
            return -1;
          }
        } else if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }

        return 0;
      })
    : [];
};

export const uniqueStatus = (features: Feature[], statusOrder: Status[]): Status[] => {
  const s = Array.from(new Set(features.map(({status}) => status))).filter(Boolean);

  return s.length
    ? s.sort((a, b) => {
        const s = statusOrder.indexOf(a) - statusOrder.indexOf(b);
        if (s > 0) {
          return 1;
        } else if (s < 0) {
          return -1;
        } else {
          return 0;
        }
      })
    : [];
};

export const uniqueCustomerSegments = (data: Feature[]): string[] =>
  Array.from(
    new Set(
      data.reduce((acc, cur: any) => {
        return acc.concat(cur.customers);
      }, [])
    )
  )
    .filter(Boolean)
    .sort();

const sortFeatures = (a: any, b: any, groupOrder?: string[]) => {
  // first sort by group name
  if (groupOrder?.length) {
    const g = groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
    if (g > 0) {
      return 1;
    } else if (g < 0) {
      return -1;
    }
  } else if (a.group > b.group) {
    return 1;
  } else if (a.group < b.group) {
    return -1;
  }

  // then sort by implementation status
  const s = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  if (s > 0) {
    return 1;
  } else if (s < 0) {
    return -1;
  }

  // and lastly sort by feature name
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  }

  return 0;
};

export const filteredFeatures = (
  features: Feature[],
  {featureGroup, implementationStatus, targetCustomers}: Filters,
  groupOrder?: string[]
): Feature[] =>
  features.length
    ? features
        .filter(({customers, group, status}) => {
          if (featureGroup !== null && featureGroup !== group) {
            return false;
          }

          if (targetCustomers !== allCustomerSegments && !customers.includes(targetCustomers)) {
            return false;
          }

          if (implementationStatus !== null && implementationStatus !== status) {
            return false;
          }

          return true;
        })
        .sort((a: any, b: any) => sortFeatures(a, b, groupOrder))
    : [];

export const transformData = (features: Feature[]) => {
  if (!features.length) {
    return {
      featureGroupsData: [],
      featuresData: [],
    };
  }

  const featuresData = features.map(({group, name: feature, status}) => ({
    count: 1,
    feature,
    group,
    status,
  }));

  const featureGroupsData = Array.from(new Set(features.map(it => it.group)))
    .filter(Boolean)
    .map(group => ({
      featuresCount: features.filter(it => it.group === group).length,
      group,
    }));

  return {
    featureGroupsData,
    featuresData,
  };
};
