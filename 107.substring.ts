function inArray(a1: string[], a2: string[]): string[] {
  const includes = a1.filter(
    (s) => a2.filter((s2) => s2.includes(s)).length > 0
  );

  return includes.sort();
}
