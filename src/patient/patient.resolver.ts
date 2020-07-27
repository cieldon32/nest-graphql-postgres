import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, ResolveField, Query, Parent} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth';
import { User, UserService } from 'src/user';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { PatientInput } from './patient.input';

@Resolver(of => Patient)
export class PatientResolver {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly patientService: PatientService,
  ) {}

  @Query(() => Patient)
  public async findPatientById(@Args('id') id: string,): Promise<Patient> {
    return this.patientService.getOneById(id);
  }

  @Query(() => [Patient])
  public async findAllPatients(): Promise<Patient[]> {
    return this.patientService.getAll();
  }

  @ResolveField('user')
  async user(@Parent() patient: Patient): Promise<User> {
    const id = patient.user?.id;
    return this.userService.getOneById(id);
  }

  @Mutation(() => Patient)
  public addPatient(
    @CurrentUser() user: User,
    @Args('patientInput') input: PatientInput,
  ): Promise<Patient> {
    return this.patientService.createPatient(user.id, input);
  }

  

}
