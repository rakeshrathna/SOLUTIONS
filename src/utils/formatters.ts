export function formatNumber(num: number, maxDecimals: number = 4): string {
  if (num === 0) return '0';
  if (Math.abs(num) < 0.0001 || Math.abs(num) >= 100000) {
    return num.toExponential(3).replace('e+', ' × 10^{').replace('e-', ' × 10^{-') + '}';
  }
  return parseFloat(num.toFixed(maxDecimals)).toString();
}

export function formatUnit(unit: string): string {
  return unit;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}
