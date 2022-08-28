function cakes(recipe, available) {
  let max = 999;
  for (const [gredient, need] of Object.entries(recipe)) {
    const availableGredient = available[gredient] ?? 0;
    const canMake = Math.floor(availableGredient / need);
    if (canMake == 0) return 0;
    if (canMake < max) max = canMake;
  }
  return max;
}
