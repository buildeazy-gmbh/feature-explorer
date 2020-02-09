import ColorPalette from 'iwanthue';
import React, {useCallback, useRef, useState} from 'react';
import {Cell, Pie, PieChart, Tooltip} from 'recharts';

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
import {COLOR_SPACE, COMMON_PIE_PROPS, RADIUS, SIZE, allCustomerSegments, statusOrder} from '../../constants';
import {groupOrder, productName} from '../../data/featureData';
import {opacityByStatus} from '../../lib';
import {
  filteredFeatures,
  transformData,
  uniqueCustomerSegments,
  uniqueFeatureGroups,
  uniqueStatus,
} from './transformData';

export const FeatureExplorer = ({features}) => {
  const customerSegments = [allCustomerSegments].concat(uniqueCustomerSegments(features));
  const featureGroups = uniqueFeatureGroups(features, groupOrder);
  const status = uniqueStatus(features, statusOrder);

  const colors = useRef(ColorPalette(featureGroups.length, {colorSpace: COLOR_SPACE})).current;
  const groupColor = group => colors[featureGroups.indexOf(group)];

  const [activeFilters, setActiveFilter] = useState({
    featureGroup: null,
    implementationStatus: null,
    targetCustomers: allCustomerSegments,
  });

  const filterFeatures = useCallback(
    (key, value) => {
      const defaultValue = key === 'targetCustomers' ? allCustomerSegments : null;
      setActiveFilter({
        ...activeFilters,
        [key]: activeFilters[key] === value ? defaultValue : value,
      });
    },
    [activeFilters, setActiveFilter]
  );

  const filters = [
    {
      heading: 'Target Customers',
      items: customerSegments,
      onClick: value => filterFeatures('targetCustomers', value),
    },
    {
      heading: 'Feature Group',
      itemColorFunc: groupColor,
      items: featureGroups,
      onClick: value => filterFeatures('featureGroup', value),
    },
    {
      heading: 'Implementation Status',
      items: status,
      onClick: value => filterFeatures('implementationStatus', value),
    },
  ];

  const {featuresData, featureGroupsData} = transformData(filteredFeatures(features, activeFilters, groupOrder));

  const heading = [productName, activeFilters.featureGroup, 'Features'].filter(Boolean).join(' ');

  return (
    <Page>
      <Main>
        <MainHeading>{heading}</MainHeading>
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
          {!activeFilters.featureGroup && (
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
        <TargetCustomers>{activeFilters.targetCustomers}</TargetCustomers>
      </Main>
      <Sidebar>
        {filters.map(it => (
          <Filter key={it.heading} {...it} />
        ))}
      </Sidebar>
    </Page>
  );
};
