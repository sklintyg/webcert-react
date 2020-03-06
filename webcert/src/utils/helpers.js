export function formatPersonnr(personnr) {
  //191212121212

  if (!personnr) {
    return undefined;
  }
  const index = personnr.length - 4;

  const response = personnr.substr(0, index) + "-" + personnr.substring(index);

  return response;
}

export function generateUUID() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
}
