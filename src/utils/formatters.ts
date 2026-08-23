export function formatNumber(num: number, maxDecimals: number = 4): string {
  if (num === 0) return '0';
  if (!isFinite(num) || isNaN(num)) return '\\text{N/A}';
  const abs = Math.abs(num);
  if (abs < 0.0001 || abs >= 100000) {
    const expStr = num.toExponential(3);
    const [mantissa, exponent] = expStr.split('e');
    const expNum = parseInt(exponent, 10);
    return `${mantissa} \\times 10^{${expNum}}`;
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

