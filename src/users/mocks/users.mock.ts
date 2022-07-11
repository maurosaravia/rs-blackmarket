import { User } from '@users/entities/user.entity';
import { Role } from '@users/entities/role.enum';

const mockUser = new User();
mockUser.firstname = 'user';
mockUser.lastname = 'user';
mockUser.email = 'user@user.com';
mockUser.password = '123456';
mockUser.role = Role.USER;
mockUser.createdAt = new Date();
mockUser.updatedAt = new Date();

const mockAdmin = new User();
mockAdmin.firstname = 'admin';
mockAdmin.lastname = 'admin';
mockAdmin.email = 'admin@admin.com';
mockAdmin.password = '1234567';
mockAdmin.role = Role.ADMIN;
mockAdmin.createdAt = new Date();
mockAdmin.updatedAt = new Date();

const mockUsers = [mockUser, mockAdmin];

const mockService = {
  findAll: jest.fn(() => {
    return mockUsers;
  }),
  findOne: jest.fn((id) => {
    return { id, ...mockUsers[id] };
  }),
};

const mockRepository = {
  findById: jest.fn((id) => {
    return mockUsers[id];
  }),
  find: jest.fn(() => {
    return mockUsers;
  }),
};

export { mockUser, mockAdmin, mockUsers, mockService, mockRepository };
