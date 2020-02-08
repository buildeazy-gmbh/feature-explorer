import ColorPalette from 'iwanthue';
import React, {useCallback, useState} from 'react';
import {Cell, Pie, PieChart, Tooltip} from 'recharts';

import {COLOR_SPACE, COMMON_PIE_PROPS, RADIUS, SIZE, statusOrder} from '../../constants';
import {groupOrder} from '../../data/demoFeatures';
import {opacityByStatus} from '../../lib';

import {
  CurvedLabel,
  FeatureDescription,
  Filter,
  Main,
  MainHeading,
  Page,
  RadialLabel,
  Sidebar,
  TargetCustomers,
} from '../../components';

import {getCustomerSegments, transformData, uniqueFeatureGroups, uniqueStatus} from './transformData';

const sortFeatures = (a, b) => {
  // first sort by group name
  if (groupOrder?.length) {
    const g = groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
    if (g > 0) {
      return 1;
    } else if (g < 0) {
      return -1;
    }
  } else {
    if (a.group > b.group) {
      return 1;
    } else if (a.group < b.group) {
      return -1;
    }
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
};

export const FeatureExplorer = ({features}) => {
  const featureGroups = uniqueFeatureGroups(features, groupOrder);
  const status = uniqueStatus(features, statusOrder);

  const colors = ColorPalette(featureGroups.length, {
    colorSpace: COLOR_SPACE,
  });
  const groupColor = group => colors[featureGroups.indexOf(group)];

  const allCustomerSegments = 'All';
  const customerSegments = [allCustomerSegments].concat(getCustomerSegments(features));

  const [targetCustomers, setTargetCustomers] = useState(allCustomerSegments);
  const [featureGroup, setFeatureGroup] = useState(null);
  const [implementationStatus, setImplementationStatus] = useState(null);

  const filterTargetCustomers = useCallback(
    customerSegment => {
      setTargetCustomers(targetCustomers === customerSegment ? allCustomerSegments : customerSegment);
    },
    [setTargetCustomers, targetCustomers]
  );

  const filterFeatureGroups = useCallback(
    group => {
      setFeatureGroup(featureGroup === group ? null : group);
    },
    [featureGroup, setFeatureGroup]
  );

  const filterStatus = useCallback(
    status => {
      setImplementationStatus(implementationStatus === status ? null : status);
    },
    [implementationStatus, setImplementationStatus]
  );

  const {featuresData, featureGroupsData} = transformData(
    features
      .filter(
        it =>
          (!featureGroup || featureGroup === it.group) &&
          (targetCustomers === allCustomerSegments || it.customers.includes(targetCustomers)) &&
          (!implementationStatus || implementationStatus === it.status)
      )
      .sort(sortFeatures)
  );

  const filters = [
    {
      heading: 'Target Customers',
      items: customerSegments,
      onClick: filterTargetCustomers,
    },
    {
      heading: 'Feature Group',
      itemColorFunc: groupColor,
      items: featureGroups,
      onClick: filterFeatureGroups,
    },
    {
      heading: 'Implementation Status',
      items: status,
      onClick: filterStatus,
    },
  ];

  const mainHeading = ['buildeazy', featureGroup, 'Features'].filter(Boolean).join(' ');

  return (
    <Page>
      <Main>
        <MainHeading>{mainHeading}</MainHeading>
        <PieChart {...SIZE}>
          <Pie
            {...COMMON_PIE_PROPS}
            data={featuresData}
            nameKey="feature"
            dataKey="count"
            outerRadius={RADIUS - 100}
            innerRadius={RADIUS - 121}
            paddingAngle={0.4}
            label={props => <RadialLabel {...props} colorFunc={groupColor} />}
            legendType="none"
          >
            {featuresData.map(({group, status}, index) => (
              <Cell
                key={`feature-cell-${index}`}
                fill={groupColor(group, features)}
                stroke="none"
                style={{
                  opacity: opacityByStatus(status),
                }}
              />
            ))}
          </Pie>
          {!featureGroup && (
            <Pie
              {...COMMON_PIE_PROPS}
              data={featureGroupsData}
              nameKey="group"
              dataKey="featuresCount"
              outerRadius={RADIUS - 135}
              innerRadius={RADIUS - 138}
              paddingAngle={1.2}
              label={props => <CurvedLabel {...props} colorFunc={groupColor} />}
            >
              {featureGroupsData.map(({group}, index) => (
                <Cell key={`feature-group-cell-${index}`} fill={groupColor(group, features)} stroke="none" />
              ))}
            </Pie>
          )}
          {/* <Tooltip content={<FeatureDescription />} /> */}
        </PieChart>
        <TargetCustomers>{targetCustomers}</TargetCustomers>
      </Main>
      <Sidebar>
        {filters.map(it => (
          <Filter key={it.heading} {...it} />
        ))}
      </Sidebar>
    </Page>
  );
};
