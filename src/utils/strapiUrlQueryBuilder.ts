export function strapiUrlQueryBuilder(...fields: string[]) {
  if (fields.length === 1) return `populate=${fields[0]}`;
  return fields.map((query, index) => `populate[${index}]=${query}`).join('&');
}
