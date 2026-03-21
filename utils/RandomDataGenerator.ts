import { faker } from "@faker-js/faker";
export class RandomDataUtil {
  static getFullName() {
    return faker.person.fullName();
  }
  static getFirstName() {
    return faker.person.firstName();
  }

  static getLastName() {
    return faker.person.lastName();
  }
  static getEmail() {
    return faker.internet.email();
  }
  static getPhoneNumber(): string {
    return faker.phone.number("##########");
  }
  static getUserName() {
    return faker.internet.username();
  }
  static getPassword() {
    return faker.internet.password();
  }
  static getRandomContry() {
    return faker.location.country();
  }
  static getRandomState() {
    return faker.location.state();
  }
  static getRandomCity() {
    return faker.location.city();
  }
  static getRandomPinCode() {
    return faker.location.zipCode();
  }
  static getRandomStreetAddress(): string {
    return faker.location.streetAddress();
  }
  static getRandomPassword(length: number = 10): string {
    return faker.internet.password({ length });
  }

  static getRandomAlphaNumeric(length: number = 10): string {
    return faker.string.alphanumeric({ length });
  }

  static getRandomNumeric(length: number = 10): string {
    return faker.string.numeric({ length });
  }
  static getRandomUUID(): string {
    return faker.string.uuid();
  }
}
