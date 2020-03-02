type Subtract<T, V> = Pick<T, Exclude<keyof T, keyof V>>;
