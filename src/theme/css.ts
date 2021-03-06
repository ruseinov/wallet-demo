import { Size } from "./size";

export const upperFirst = (value: string) => value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);

type Value = Size | "center" | "end" | "start" | number | boolean | undefined;

export const capitalize = (value: Value, prefix?: string) => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "boolean") {
    return prefix || "";
  }

  if (typeof value === "number") {
    return prefix ? `${prefix}${value}` : value;
  }

  if (typeof value !== "string") {
    return false;
  }

  const capitalized = upperFirst(value);

  return prefix ? `${prefix}${capitalized}` : capitalized;
};
