import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueConstraint } from './unique-code.validator';

export type IsUniqueInterface = {
  tableName: string;
  column: string;
};

// decorator function
export function IsUnique(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
