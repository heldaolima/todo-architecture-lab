import { User } from '../domain/entities/user.entitiy';

export interface UserRepository {
  save: (email: string, password: string) => Promise<User>;
  getById: (id: number) => Promise<User | null>;
  getByEmail: (email: string) => Promise<User | null>;
}
