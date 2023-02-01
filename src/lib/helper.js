function sleep(n = 500) {
  return new Promise((r) => setTimeout(() => r(), n))
}

export async function genSubNodes(id = 0, level = 1) {
  const count = Math.ceil(Math.random() * 20)
  await sleep(1000)
  return {
    count,
    subs: new Array(count).fill(null).map((_, index) => ({
      id: `${id}${level}${index}` - 0,
      label: `${id}__${level}__@mail.com`,
      pid: id
    }))
  }
}
let idCounter = 0

export function getData(count) {
  const data = []
  for (let index = 0; index < count; index++) {
    data.push({
      id: String(idCounter++),
      name: Math.random()
        .toString(16)
        .substring(10)
    })
  }
  return data
}
