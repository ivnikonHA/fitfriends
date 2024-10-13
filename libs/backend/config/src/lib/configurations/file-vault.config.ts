import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export interface FileVaultConfig {
  uploadDirectory: string;
  serveRoot: string;
}

const validationSchema = Joi.object({
  uploadDirectory: Joi.string().required(),
  serveRoot: Joi.string().default('/static')
});

function validateConfig(config: FileVaultConfig) {
  const { error } = validationSchema.validate(config, {abortEarly: true});
  if(error) {
    throw new Error(`[FileVaultConfig Validation Error]: ${error.message}`)
  }
}

function getConfig(): FileVaultConfig {
  const config: FileVaultConfig = {
    uploadDirectory: process.env.UPLOAD_DIRECTORY,
    serveRoot: process.env.SERVE_ROOT
  };
  validateConfig(config);
  return config;
}

export default registerAs('upload', getConfig);
