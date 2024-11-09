import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'employee_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    EmployeeModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
