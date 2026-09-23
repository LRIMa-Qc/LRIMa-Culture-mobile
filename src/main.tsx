import "reflect-metadata";

import './index.css'
import './setup/pwa'
import Root from './setup/app.tsx'

/* PWA Elements for Web Version Compatibility */
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

Root.render(document.getElementById('root')!);
