export function capitalizeWords(input: string | string[]): string {
    if (Array.isArray(input)) {
        return input.map(str => str.replace(/\b\w/g, char => char.toUpperCase())).join(", ");
    }
    return input.replace(/\b\w/g, char => char.toUpperCase());
  }