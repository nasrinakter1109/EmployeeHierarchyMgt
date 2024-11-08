import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repository: Repository<Employee>;
  
  const employeeArray = [
    { id: 1, name: 'CTO', positionId: 1, positionName: 'Chief Technology Officer', children: [] },
    { id: 2, name: 'Senior Engineer', positionId: 2, positionName: 'Senior Software Engineer', children: [] },
  ];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            findOne: jest.fn().mockResolvedValue(employeeArray[0]),
            save: jest.fn().mockResolvedValue(employeeArray[0]),
            create: jest.fn().mockReturnValue(employeeArray[0]),
          },
        },

      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);

    repository = module.get<Repository<Employee>>(getRepositoryToken(Employee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully insert a new employee', async () => {
      const dto: CreateEmployeeDto = { name: 'CTO', positionId: 1, positionName: 'Chief Technology Officer', supervisorId: null };
      const result = await service.create(dto);
      expect(result).toEqual(employeeArray[0]);
    });
  });
  describe('findHierarchy', () => {
    it('should find an employee with a given id', async () => {
      const expectedEmployee = { ...employeeArray[0], children: null };
    const result = await service.findHierarchy(1);
      expect(result).toEqual(expectedEmployee);
    });
  });

});
