import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthCheckController {
  constructor(private health: HealthCheckService, private databaseHealth: TypeOrmHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.databaseHealth.pingCheck('database', { timeout: 3000 })]);
  }
}
