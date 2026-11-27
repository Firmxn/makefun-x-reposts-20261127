import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  const raw = readFileSync(join(BOT_DIR, 'POSTS.json'), 'utf8');
  const parsed = JSON.parse(raw) as { posts?: unknown };
  if (!Array.isArray(parsed.posts) || parsed.posts.length === 0) {
    throw new Error('POSTS.json missing non-empty posts array');
  }
  writeFileSync(join(OUTPUT_DIR, 'POSTS.json'), JSON.stringify({ posts: parsed.posts }) + '\n');
} catch (err) {
  console.error(`POSTS.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
