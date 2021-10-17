import { PipeTransform } from '@nestjs/common'

export type Instantiable<T = any> = {new(...args: any[]): T};

export class ParseToClass implements PipeTransform<Record<string, any>, any> {
  constructor (
    private readonly Clazz: any
  ) {}

  transform (value: Record<string, any>): any {
    const instance = new this.Clazz()

    Object.assign(instance, value)

    return instance
  }
}
