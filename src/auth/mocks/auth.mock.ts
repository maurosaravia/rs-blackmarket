import { faker } from '@faker-js/faker';
import { SignUpDTO } from '@auth/dtos/signup.dto';
import { Role } from '@users/entities/role.enum';

const firstname = faker.name.firstName();
const lastname = faker.name.lastName();
const email = faker.internet.email();
const password = faker.internet.password();
const mockSignupDTO = new SignUpDTO({ firstname, lastname, email, password });

const mockService = {
  signUp: jest.fn((dto) => {
    const date = faker.date.past();
    return { id: 1, ...dto, role: Role.USER, createdAt: date, updatedAt: date };
  }),
};

export { mockSignupDTO, mockService };
