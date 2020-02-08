export const truncate = (text: string, length: number = 28): string =>
  text.length > length ? `${text.slice(0, length)}…` : text;
