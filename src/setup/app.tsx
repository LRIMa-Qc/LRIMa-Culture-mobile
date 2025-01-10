import { createALIVEcoreApp } from '@alivecode/core';

import router from './router';
import api from './api';
import components from './components';
import i18next from 'i18next';
import { reactToastDecorator } from '@alivecode/core/alerts';
import { i18nextDecorator } from '@alivecode/core/translations';

import { initReactI18next } from 'react-i18next';
import HttpAPI from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ToastContainer } from 'react-toastify';
import { appDecorator } from './AppDecorator/decorator';

const Root = createALIVEcoreApp({
    meta: {
        name: 'AliveCulture Mobile',
    },
    app: {
        api,
        router,
        components,
        onAppVersionMismatch: ({ children, clientVersion, serverVersion }) => {
            return (
                <div>
                    Version mismatch: Client version ({clientVersion?.number}) is not the
                    same as Server Version ({serverVersion?.number}){children}
                </div>
            );
        },
    },

    decorators: [
        i18nextDecorator(
            i18next.use(HttpAPI).use(LanguageDetector).use(initReactI18next),
            {
                i18nextInitConfig: {
                    supportedLngs: ['fr', 'en', 'ar'],
                    fallbackLng: 'fr',
                    detection: {
                      order: [
                        'querystring',
                        'path',
                        'cookie',
                        // 'localStorage',
                        // 'sessionStorage',
                        // 'navigator',
                        // 'htmlTag',
                        // 'subdomain',
                      ],
                      caches: ['cookie'],
                    },
                    interpolation: {
                      escapeValue: false,
                    },
                    backend: {
                      loadPath: `/assets/locales/{{lng}}/{{ns}}.json`,
                    },
                    defaultNS: 'translation',
                  }
            }
        ),
        reactToastDecorator(ToastContainer),
        appDecorator,
    ],
});

export default Root;