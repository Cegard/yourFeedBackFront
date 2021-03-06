import { browserHistory } from 'react-router';
const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
   };

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
   };

export default function createRoutes(store) {
    return [
        {
          path: '/',
          name: 'home',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('./template/MainApp'),
            ]);
            const renderRoute = loadModule(cb);
    
            importModules.then(([component]) => {
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        }
    ]
}