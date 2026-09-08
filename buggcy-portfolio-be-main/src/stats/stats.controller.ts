import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/enums/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Admin Stats')
@Controller('admin/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // No @RequireModule here on purpose: the dashboard itself is always visible
  // to every logged-in ADMIN or HR user. What differs per user is *which*
  // counts come back — getStats() below trims the response down to the
  // modules this user actually has permission for.
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get dashboard stats, scoped to the caller\'s permissions [ADMIN, HR, BD]' })
  getStats(@Req() req: { user: { role: Role; permissions?: string[] } }) {
    return this.statsService.getStats(req.user);
  }
}
