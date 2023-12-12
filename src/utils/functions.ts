/**
 * Slices a text to a maximum length.
 *
 * @param {string} txt The text to slice
 * @param {number} max The maximum length of the sliced text (default: 50)
 * @returns {string} The sliced text
 */

export const txtSlicer = (txt: string, max: number = 50) => {
  if (txt.length >= max) return `${txt.slice(0, max)} ...`;
  else return txt;
};

/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
