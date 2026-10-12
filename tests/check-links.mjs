// Verifica links de contato, ativos referenciados e consistência dos números. Sem dependências.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "src/content.js"), "utf8"), sandbox);
const content = sandbox.window.PLATINUM;

const errors = [];
const fail = (msg) => errors.push(msg);

// Ativos locais referenciados
for (const m of html.matchAll(/(?:src|href)="([^"#?]+)(?:[#?][^"]*)?"/g)) {
  const ref = m[1];
  if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
  if (!existsSync(join(root, ref))) fail(`Arquivo referenciado não existe: ${ref}`);
}

// Números de WhatsApp
for (const m of html.matchAll(/https:\/\/wa\.me\/(\d+)/g)) {
  if (m[1] !== content.whatsappPrimary) fail(`wa.me com número divergente: ${m[1]}`);
}
if (!/^55\d{2}9\d{8}$/.test(content.whatsappPrimary)) fail("whatsappPrimary fora do formato 55DD9XXXXXXXX");
if (!/^55\d{2}9\d{8}$/.test(content.phoneSecondary)) fail("phoneSecondary fora do formato 55DD9XXXXXXXX");

// tel: e mailto: no HTML coerentes com o conteúdo
for (const m of html.matchAll(/href="tel:\+(\d+)"/g)) {
  if (![content.whatsappPrimary, content.phoneSecondary].includes(m[1])) fail(`tel: desconhecido: ${m[1]}`);
}
for (const m of html.matchAll(/href="mailto:([^"]+)"/g)) {
  if (m[1] !== content.email) fail(`mailto: divergente: ${m[1]}`);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m[1])) fail(`E-mail inválido: ${m[1]}`);
}

// O segundo número só aparece na seção de contato
const outsideContact = html.slice(html.indexOf("<body")).split('<section id="contato"')[0];
if (outsideContact.includes(content.phoneSecondary) || outsideContact.includes(content.phoneSecondaryLabel)) {
  fail("Número secundário aparece fora da seção #contato");
}

// Campos obrigatórios
for (const key of ["name", "tagline", "email", "instagram", "facebook", "serviceArea", "hours"]) {
  if (!content[key]) fail(`Campo vazio em content.js: ${key}`);
}
if (content.services.length !== 6) fail("Esperados 6 serviços");
if (content.problems.length !== 4) fail("Esperados 4 problemas");
if (content.differentiators.length !== 4) fail("Esperados 4 diferenciais");
if (content.promotion.benefits.length !== 4) fail("Esperados 4 benefícios na promoção");

// Ícones usados existem no sprite
const sprite = readFileSync(join(root, "assets/icons.svg"), "utf8");
const used = new Set([
  ...[...html.matchAll(/icons\.svg#([\w-]+)/g)].map((m) => m[1]),
  ...[...content.problems, ...content.services, ...content.differentiators].map((i) => i.icon),
]);
for (const name of used) if (!sprite.includes(`id="${name}"`)) fail(`Ícone ausente no sprite: ${name}`);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("✓ Links, ativos e dados consistentes");
