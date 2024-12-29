import { ALIVEcoreComponents } from '@alivecode/core';
import React from 'react';

const NotFound = React.lazy(() => import('../pages/NotFound'));

const components: ALIVEcoreComponents = {
    MaintenanceError: () => <>MaintenanceError...</>,
    NotFound: NotFound,
    Loading: () => <>Loading...</>,
};

export default components;