/* jshint esversion:6 */
export function makeID() {
  var id = "";
  var possible = "0123456789";
  for (var i = 0; i < 4; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  return id;
}

export function uniqueID(id, IDsUsed) {
  while (IDsUsed.includes(id)) {
    id = makeID();
  }
  return id;
}
