export function isNumber(entity: any): entity is number {
  if (!entity) return false;

  const parsedEntity = parseInt(entity);

  if (isNaN(parsedEntity)) return false;

  if (typeof parsedEntity !== "number") return false;

  return true;
}
