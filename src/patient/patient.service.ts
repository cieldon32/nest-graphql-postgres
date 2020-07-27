import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { User } from 'src/user';
import { Patient } from './patient.entity';
import { PatientInput } from './patient.input';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) {}

  public async createPatient(
    userId: string,
    input: PatientInput,
  ): Promise<Patient> {
    const user = await this.userRepository.findOne(userId);
    const patient = new Patient();
    patient.user = user;
    patient.userRole = user.role;
    patient.appointmentTime = input.appointmentTime;
    return await this.patientRepository.save(patient);
  }

  public async getOneById(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne(id);
    if (!patient) {
      throw new NotFoundException('Patient does not exist');
    }

    return patient;
  }

  public async getAll(): Promise<Patient[]> {
    return await this.patientRepository.find({
      where: {
        userRole: 'admin'
      },
      relations: ["user"]
    });
  }
}
