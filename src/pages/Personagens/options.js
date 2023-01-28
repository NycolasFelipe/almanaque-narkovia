const options = [
  {
    "text": "Modelo",
    "url": "/personagens/modelo",
  },
  {
    "text": "Lua Amaya",
    "url": "/personagens/lua-amaya",
  },
];

export function getOptions() {
  return options.sort((a, b) => a.text.localeCompare(b.text));
} 