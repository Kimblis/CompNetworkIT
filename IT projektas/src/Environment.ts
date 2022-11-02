import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, validateSync, IsString, IsNumber, IsOptional } from 'class-validator';

const { NODE_ENV } = process.env;

enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment, { always: true })
  NODE_ENV: Environment;

  @IsOptional({ always: true })
  @IsNumber({}, { always: true })
  API_PORT: number;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  DB_USER: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  DB_PASS: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  MYSQL_DATABASE: string;

  @IsNotEmpty({ always: true })
  @IsNumber({}, { always: true })
  DB_PORT: number;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  DB_HOST: string;

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  PASSWORD_SECRET: string;

  @IsNotEmpty({ always: true })
  @IsNumber({}, { always: true })
  PASSWORD_EXPIRES: number;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false, groups: [validatedConfig.NODE_ENV] });

  if (errors.length && NODE_ENV !== 'test') {
    console.error(errors.toString());
    process.exit(130);
  }

  return validatedConfig;
};
