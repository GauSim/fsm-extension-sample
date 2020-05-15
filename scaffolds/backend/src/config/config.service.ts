import { readFileSync } from 'fs';

require('dotenv').config();

const version = readFileSync('VERSION').toString().trim();

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {

    // ensure vars are set on boot
    [
      'PORT',
      'CLIENT_IDENTIFIER',
      'CLIENT_SECRET'
    ]
      .forEach(key => this.getValue(key));
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public getVersion() {
    return version || 'N/A';
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode === 'production';
  }

  public isLocal() {
    const mode = this.getValue('MODE', false);
    return mode === 'local';
  }

  public getClientIdentifier() {
    return this.getValue('CLIENT_IDENTIFIER', true);
  }

  public getClientSecret() {
    return this.getValue('CLIENT_SECRET', true);
  }

}

const configService = new ConfigService(process.env);

export { configService };