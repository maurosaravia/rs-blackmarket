import { User } from '@users/entities/user.entity';
import { Role } from '@users/entities/role.enum';
import { UserDTO } from '@users/dtos/user.dto';
import { faker } from '@faker-js/faker';

let firstname = faker.name.firstName();
let lastname = faker.name.lastName();
let email = faker.internet.email();
let password = faker.internet.password();
let role = Role.USER;
const mockUser = new User({ firstname, lastname, email, password, role });
mockUser.createdAt = mockUser.updatedAt = faker.date.past();
const mockUserDTO = new UserDTO({ firstname, lastname, email, password, role });

firstname = faker.name.firstName();
lastname = faker.name.lastName();
email = faker.internet.email();
password = faker.internet.password();
role = Role.ADMIN;
const mockAdmin = new User({ firstname, lastname, email, password, role });
const mockAdminDTO = new UserDTO({
  firstname,
  lastname,
  email,
  password,
  role,
});
mockAdmin.createdAt = mockAdmin.updatedAt = faker.date.past();

const mockUsers = [mockUser, mockAdmin];

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
  saveDTO: jest.fn((dto) => {
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
