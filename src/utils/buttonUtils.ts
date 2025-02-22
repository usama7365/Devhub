export function buttonUtils(
  ...inputs: (string | boolean | null | undefined)[]
): string {
  return inputs.filter(Boolean).join(' ');
}
