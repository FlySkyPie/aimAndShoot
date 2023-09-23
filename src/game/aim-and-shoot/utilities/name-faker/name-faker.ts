import female_first_name from "./data/female_first_name";
import last_name from "./data/last_name";

/**
 * Unfortunately `@faker-js/faker` not support code split, I have to extract part of data
 * to create random name.
 */
export abstract class NameFaker {
  public static fakeUsername(): string {
    const firstName = NameFaker.fakeFirstName();
    const lastName = NameFaker.fakeLastName();

    let result: string = "";
    switch (NameFaker.getRandomInt(3)) {
      case 0:
        result = `${firstName}${NameFaker.getRandomInt(3)}`;
        break;
      case 1:
        result = firstName + NameFaker.randElement([".", "_"]) + lastName;
        break;
      case 2:
        result = `${firstName}${NameFaker.randElement([
          ".",
          "_",
        ])}${lastName}${NameFaker.getRandomInt(100)}`;
        break;
    }

    return result;
  }

  private static fakeLastName(): string {
    return last_name[Math.floor(Math.random() * last_name.length)];
  }

  private static fakeFirstName(): string {
    return female_first_name[
      Math.floor(Math.random() * female_first_name.length)
    ];
  }

  private static randElement(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  private static getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
