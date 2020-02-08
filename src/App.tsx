import React from 'react';

import {featureData} from './data/featureData';
import {FeatureExplorer} from './modules/FeatureExplorer';

const App = () => <FeatureExplorer features={featureData} />;

export default App;
