const options = [
  {
    "text": "Lua Amaya",
    "url": "/personagens/lua-amaya",
  },
  {
    "text": "Zênite Podwick",
    "url": "/personagens/zenite-podwick"
  }
];

export function getOptions() {
  return options.sort((a, b) => a.text.localeCompare(b.text));
} 