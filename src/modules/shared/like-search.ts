export function LikeSearch (): PropertyDecorator {
  return (target: Object, propertyKey: string) => {
    Reflect.defineMetadata('LIKE_SEARCH', true, target, propertyKey)
  }
}
