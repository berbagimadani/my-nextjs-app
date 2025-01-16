// utils/random.ts (atau nama file lain yang Anda inginkan)

export function randomNumber(max: number): number;
export function randomNumber(min: number, max: number): number;
export function randomNumber(minOrMax: number, maybeMax?: number): number {
  let min: number;
  let max: number;

  if (maybeMax === undefined) {
    min = 0;
    max = minOrMax;
  } else {
    min = minOrMax;
    max = maybeMax;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}