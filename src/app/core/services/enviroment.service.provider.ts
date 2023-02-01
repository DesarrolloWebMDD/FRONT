import { EnviromentService } from './enviroment.service';

export const EnviromentServiceFactory = () => {
  // Create env
  const env = new EnviromentService();

  // Read environment variables from browser window
  const browserWindow = (window as any)|| {};
  const browserWindowEnv = browserWindow['__env'] || {};

  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      (env as any)[key] = (window as any)['__env'][key];
    }
  }

  return env;
};

 

export const EnviromentServiceProvider = {
  provide: EnviromentService,
  useFactory: EnviromentServiceFactory,
  deps: []
};
