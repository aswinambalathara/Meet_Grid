export function generateGoogleMapLink(latitude:number, longitude:number) {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}
