import { getValidatedEnvironment } from '@utils/environment';

export function initURL() {
  switch (getValidatedEnvironment()) {
    case 'staging':
      return {
        api: 'https://api-stage.synthos.health',
        ui: 'https://stage.synthos.health',
      };
    case 'preprod':
      return {
        api: 'https://api-preprod.synthos.health',
        ui: 'https://preprod.synthos.health',
      };
    default:
      throw new Error('Unexpected error: Invalid environment');
  }
}
