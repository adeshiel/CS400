function* thisWord(sentence){
  let breakup = sentence.split(" ");
  let start = 0;
  while(start < breakup.length){
    yield breakup[start];
    start++;
  }
}

let test = "All I know is something like a bird within her sang"
let gen = thisWord(test);
while(true){
  let nator = gen.next();
  if(nator.done){
    break;
  }
  console.log(nator.value); // 0
}
