import React from 'react';

import {FeatureExplorer} from './modules/FeatureExplorer';
import {featureData} from './data/featureData';

const App = () => <FeatureExplorer features={featureData} />;

export default App;
