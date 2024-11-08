import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  positionId: number;

  @Column()
  positionName: string;


  @ManyToOne(() => Employee, (employee) => employee.children, { nullable: true }) // Relation to another employee
  @JoinColumn({ name: 'supervisorId' })  // Explicitly name the column
  supervisor: Employee;

  @OneToMany(() => Employee, (employee) => employee.supervisor)
  children: Employee[];
}
