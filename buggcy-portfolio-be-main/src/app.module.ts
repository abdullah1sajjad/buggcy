import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CareersModule } from "./careers/careers.module";
import { BlogsModule } from "./blogs/blogs.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { UploadsModule } from "./uploads/uploads.module";
import { ApplicationsModule } from "./applications/applications.module";
import { ServicesModule } from "./services/services.module";
import { ContactModule } from "./contact/contact.module";
import { SiteIndustriesModule } from "./site-industries/site-industries.module";
import { SiteSuccessStoriesModule } from "./site-success-stories/site-success-stories.module";
import { MailModule } from "./mail/mail.module";
import { SettingsModule } from "./settings/settings.module";
import { StatsModule } from "./stats/stats.module";
import { PermissionsGuard } from "./auth/guards/permissions.guard";
import { LeadsModule } from './leads/leads.module';
import { ProposalsModule } from './proposals/proposals.module';
import { TemplatesModule } from './templates/templates.module';
import { CompanyDataModule } from './company-data/company-data.module';
import { AiModule } from './ai/ai.module';
import { ProjectAssistantModule } from './project-assistant/project-assistant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    // ── Global rate limiting ────────────────────────────
    // Default bucket applies to every route unless a controller/handler
    // overrides it with its own @Throttle(...) (e.g. auth login, contact form).
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          name: "default",
          ttl: configService.get<number>("THROTTLE_TTL_MS", 60_000),
          limit: configService.get<number>("THROTTLE_LIMIT", 100),
        },
      ],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>("DATABASE_URL"),
        ssl: configService.get<string>("DATABASE_URL")?.includes("localhost") ? false : { rejectUnauthorized: false },
        autoLoadEntities: true,
        synchronize: true,
        // logging: ["error"],
        extra: {
          max: 10,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 30000,
        },
      }),
    }),

    AuthModule,
    UsersModule,
    ApplicationsModule,
    CareersModule,
    BlogsModule,
    CloudinaryModule,
    UploadsModule,
    ServicesModule,
    ContactModule,
    SiteIndustriesModule,
    SiteSuccessStoriesModule,
    MailModule,
    SettingsModule,
    StatsModule,
    LeadsModule,
    ProposalsModule,
    TemplatesModule,
    CompanyDataModule,
    AiModule,
    ProjectAssistantModule,
  ],
  
  providers: [
    // Applies rate limiting to every route in the app by default.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    
  ],
})
export class AppModule {}
