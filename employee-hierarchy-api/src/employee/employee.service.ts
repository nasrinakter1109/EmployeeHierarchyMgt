import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    if (createEmployeeDto.supervisorId) {
        const supervisor = await this.employeeRepository.findOne({
          where: { id: createEmployeeDto.supervisorId },
        });
        if (supervisor) {
            employee.supervisor = supervisor;
          }
      }
  
      return this.employeeRepository.save(employee);
  }

  async findHierarchy(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
        where: { id },
        relations: ['children','children.children'],
      });
  
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
  
      return this.formatEmployeeHierarchy(employee);
  }
  private formatEmployeeHierarchy(employee: Employee): any {
    return {
      id: employee.id,
      name: employee.name,
      positionId: employee.positionId,
      positionName: employee.positionName,
      children: employee.children && employee.children.length > 0
        ? employee.children.map((child) => this.formatEmployeeHierarchy(child))
        : null
    };
  }
}
