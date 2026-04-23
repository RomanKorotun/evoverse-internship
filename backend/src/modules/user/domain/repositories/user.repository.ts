import { UserEntity } from '../entities/user.entity';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export interface CreateUserInput {
  email: string;
  password: string;
  quota: number;
  role: UserRole;
  status: UserStatus;
}

export interface UpdateStatus {
  userId: string;
  status: UserStatus;
}

export interface UpdateQuotaInput {
  userId: string;
  quota: number;
}

export interface IUsersRepository {
  createUser(data: CreateUserInput): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  findAllUsersOnly(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  updateStatus(data: UpdateStatus): Promise<UserEntity | null>;
  updateQuota(data: UpdateQuotaInput): Promise<UserEntity | null>;
}
