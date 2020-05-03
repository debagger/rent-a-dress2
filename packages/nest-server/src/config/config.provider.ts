import { ConfigInterface } from './config.interface';

export const ConfigProvider = {
  provide: 'CONFIG',
  useFactory: () => {
    const config: ConfigInterface = {
      imagePath: process.env.IMG_PATH,
      databasePath: process.env.DATABASE_PATH,
      httpMode: process.env.HTTP_MODE,
      httpsKeyPath: process.env.HTTPS_KEY_PATH,
      httpsCertPath: process.env.HTTPS_CERT_PATH,
    }
    return config;
  },
};
