import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';
import { User, UserModule } from 'src/user';
import { Patient } from './patient.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Patient, User]),
  ],
  providers: [PatientService, PatientResolver],
  exports: [PatientService]
})
export class PatientModule {}
