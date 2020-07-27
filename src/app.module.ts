import { Module } from '@nestjs/common';
import { ConfigModule, GqlModule, TypeOrmModule } from 'src/modules';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    ConfigModule,
    GqlModule,
    TypeOrmModule,
    UserModule,
    AuthModule,
    PatientModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
  
}
