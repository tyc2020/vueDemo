var a = 11;
var b = {
  x:22,
  y:33
}

function ab (b){
  b.y = 1
}
ab(b)
console.log(b.y);


function fun(m,n){
  m = 101
  n.x = 102
  n = {
    x:103,
    y:104
  }
  
}
c= fun(a,b)
console.log(b)
