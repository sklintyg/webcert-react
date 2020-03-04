export function formatPersonnr(personnr) {
  //191212121212

  if (!personnr) {
    return undefined;
  }
  const index = personnr.length - 4;

  const response = personnr.substr(0, index) + "-" + personnr.substring(index);

  return response;
}
