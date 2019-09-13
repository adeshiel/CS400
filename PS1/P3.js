const apply = (string, funct) => {
  return funct(string);
}
let lamb1 = function(a) {
  let strip_c = a.split("c");
  if (strip_c.length > 1){
    for (let i = 1; i < strip_c.length; i++){
      strip_c[i] = "c" + strip_c[i]
    }
  }
  return strip_c
}
let lamb2 = function(a) {
  //I know I could've looped it or count the items after a .split, but I wanted to learn something new so I found .match
   let replace_a = a.replace(/a/g, "A");
   let a_count = (a.match(/a/g) || []).length;
   let final_object = {
     'originalString': a,
     'modifiedString': replace_a,
     'numberReplaced': a_count,
     'length': a.length
   }
   return final_object;
 }
console.log(`1: ${ apply('supercalifragilisticexpialidocious', lamb1) }`);
console.log(`2: ${ apply('supercalifragilisticexpialidocious', lamb2) }`);
