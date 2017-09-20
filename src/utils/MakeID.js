/* jshint esversion:6 */
export function makeID() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 22; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export function uniqueID(id, IDsUsed) {
  while (IDsUsed.includes(id)) {
    id = makeID();
  }
  return id;
}
