import { SetMetadata } from '@nestjs/common';
import type { PermissionModule } from './permission-module.enum';

export const MODULE_KEY = 'module';

/** Usage: @RequireModule('blogs') */
export const RequireModule = (moduleKey: PermissionModule) => SetMetadata(MODULE_KEY, moduleKey);