import randomString from "../scripts/randomString";

const urls = {
  "guia-para-criacao-de-personagem": "https://docs.google.com/document/d/e/2PACX-1vSIJFBGP2Ie4JodN5Blzg9LCjYX_cTj2WDLJCc4Bn1_RZ2NAgRX7_NpumPoDas7hmk_CpbT17OJ4kx0/pub",
  "mapas": "https://docs.google.com/document/d/e/2PACX-1vQUL-5060ni5VbXdP20i1hft-P7oXMIe8Yi3xMAXSnp5M9fDDvosiRX7QDzYWAcWpSHNhTOrqjcPP25/pub",
}

export const personagens = {
  "modelo": "https://docs.google.com/document/d/e/2PACX-1vQK-BjFTiu1WNsTK9OZT0ismrlQVes7zgqB10pcttISceA3_jHhj1ex-u5kdKK-iBudfx5TLOss85kO/pub",
  "lua-amaya": "https://docs.google.com/document/d/e/2PACX-1vSZvx0SZhUZE8zFPHIscDdrPv6PICBWV3707bHWVIHiFnFpQ46jxd90_scRxjG0ZOnyijDRaTB0ACRv/pub",
}

export function url(name) {
  return `${urls[name]}?${randomString}`;
}