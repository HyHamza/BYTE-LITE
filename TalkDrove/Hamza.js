var tabCmds = [];
let cm = [];
function Hamza(obj, fonctions) {
  let infoComs = obj;
  if (obj.category) {
    obj.categorie = obj.category;
  }
  if (!obj.categorie) {
    infoComs.categorie = "General";
  }
  if (!obj.reaction) {
    infoComs.reaction = "✅";
  }
  if (!obj.alias) {
    obj.alias = [];
  }
  infoComs.fonction = fonctions;
  cm.push(infoComs);
  // console.log('chargement...')
  return infoComs;
}
module.exports = {
  zokou,
  Module: Hamza,
  cm
};
