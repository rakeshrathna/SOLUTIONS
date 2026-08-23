/**
 * Safely evaluates a math expression string with given variable values.
 * Supports Math library functions (Math.exp, Math.pow, Math.sqrt, Math.log, etc.)
 */
export function evaluateFormula(formulaStr: string, variables: Record<string, number>): number {
  try {
    const varNames = Object.keys(variables);
    const varValues = Object.values(variables);
    
    // Create function with variable arguments and Math context
    const fn = new Function(...varNames, `return (${formulaStr});`);
    const result = fn(...varValues);
    
    if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
      return 0;
    }
    return result;
  } catch (err) {
    console.error(`Error evaluating formula "${formulaStr}" with vars:`, variables, err);
    return 0;
  }
}
