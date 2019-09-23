function* Fib(){
  let num = 0;
  let next_num = 1;

  while(true){
    let res_num = num + next_num;
    yield res_num;
    num = next_num;
    next_num = res_num;
  }
}

function* FibFriend(){
  const fibby = Fib();
  while(true){
    let cur = fibby.next().value;
    if(cur % 2 == 0){
      yield cur;
    }
  }

}

let gen = FibFriend();
let six = 0;
while(six < 6){
  console.log(gen.next().value); // 0
  six++;
}
