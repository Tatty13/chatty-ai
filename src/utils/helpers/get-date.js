/**
 * @returns date in format "12 July 2023"
 */
export function getDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleDateString('en-EN', { month: 'long' });
  const year = now.getFullYear();
  const date = `${day} ${month} ${year}`;
  return date;
}
