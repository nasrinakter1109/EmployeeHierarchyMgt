import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('employee')
@ApiBearerAuth()      
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'The employee has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    console.log((createEmployeeDto))
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Get employee hierarchy by ID' })
  @ApiResponse({ status: 200, description: 'Employee hierarchy data returned.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @UseGuards(JwtAuthGuard)
  @Get('hierarchy/:id')
  findHierarchy(@Param('id') id: string) {
    return this.employeeService.findHierarchy(+id);
  }
}
