import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  const mockEmployeeService = {
    create: jest.fn((dto) => {
      return { id: 1, ...dto };
    }),
    findHierarchy: jest.fn((id) => {
      return { id, name: 'CTO', positionId: 1, positionName: 'Chief Technology Officer', children: [] };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },]
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create an employee', async () => {
      const dto: CreateEmployeeDto = { name: 'CTO', positionId: 1, positionName: 'Chief Technology Officer', supervisorId: null };
      expect(await controller.create(dto)).toEqual({
        id: 1,
        ...dto,
      });
      expect(mockEmployeeService.create).toHaveBeenCalledWith(dto);
    });
  });
  describe('findHierarchy', () => {
    it('should return employee hierarchy', async () => {
      const id = '1';
      expect(await controller.findHierarchy(id)).toEqual({
        id: 1,
        name: 'CTO',
        positionId: 1,
        positionName: 'Chief Technology Officer',
        children: [],
      });
      expect(mockEmployeeService.findHierarchy).toHaveBeenCalledWith(1);
    });
  });
});
