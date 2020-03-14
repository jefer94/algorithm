const cache = {}

export default function (key) {
  if (Number.isInteger(cache[key])) cache[key] += 1
  else cache[key] = 0
  return `${key}_${cache[key]}`
}
