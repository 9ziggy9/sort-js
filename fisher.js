let data = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function shuff(xs) {
  for (let i = 0; i < xs.length - 1; i++) {
    const rand = Math.floor((xs.length - i) * Math.random()) + i;
    [xs[i], xs[rand]] = [xs[rand], xs[i]];
  }
  return xs;
}

console.log(shuff(data));
