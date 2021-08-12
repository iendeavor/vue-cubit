export function proxy(self: any, other: any) {
  return new Proxy(self, {
    get: function (target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        return Reflect.get(other, prop, receiver);
      }
    },
    set: function (target, prop, value, receiver) {
      if (prop in target) {
        return Reflect.set(target, prop, value, receiver);
      } else {
        return Reflect.set(other, prop, value, receiver);
      }
    },
  });
}
