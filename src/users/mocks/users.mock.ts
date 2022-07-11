import { User } from '@users/entities/user.entity';
import { Role } from '@users/entities/role.enum';
import { UserDTO } from '@users/dtos/user.dto';

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

const mockUserDTO = new UserDTO();
mockUserDTO.firstname = mockUser.firstname;
mockUserDTO.lastname = mockUser.lastname;
mockUserDTO.email = mockUser.email;
mockUserDTO.password = mockUser.password;
mockUserDTO.role = mockUser.role;

const mockAdminDTO = new UserDTO();
mockAdminDTO.firstname = mockAdmin.firstname;
mockAdminDTO.lastname = mockAdmin.lastname;
mockAdminDTO.email = mockAdmin.email;
mockAdminDTO.password = mockAdmin.password;
mockAdminDTO.role = mockAdmin.role;

const mockService = {
  findAll: jest.fn(() => {
    return mockUsers;
  }),
  findOne: jest.fn((id) => {
    return { id, ...mockUsers[id] };
  }),
  create: jest.fn((dto) => {
    return { id: 1, ...mockUser, ...dto };
  }),
};

const mockRepository = {
  findById: jest.fn((id) => {
    return mockUsers[id];
  }),
  find: jest.fn(() => {
    return mockUsers;
  }),
  createUser: jest.fn((dto) => {
    return { id: 1, ...mockUser, ...dto };
  }),
};

export {
  mockUser,
  mockAdmin,
  mockUsers,
  mockService,
  mockRepository,
  mockUserDTO,
  mockAdminDTO,
};
