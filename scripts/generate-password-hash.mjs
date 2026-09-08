import readline from 'node:readline';
import bcrypt from 'bcryptjs';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function askHidden(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    const stdin = process.stdin;
    stdin.setRawMode?.(true);
    let value = '';
    const onData = (chunk) => {
      const key = chunk.toString();
      if (key === '\r' || key === '\n') {
        stdin.setRawMode?.(false); stdin.removeListener('data', onData); process.stdout.write('\n'); resolve(value); return;
      }
      if (key === '\u0003') process.exit(130);
      if (key === '\u0008' || key === '\u007f') value = value.slice(0, -1); else value += key;
    };
    stdin.on('data', onData);
  });
}
const password = await askHidden('Password: ');
rl.close();
if (!password || Buffer.byteLength(password, 'utf8') > 72) { console.error('Password must be 1-72 UTF-8 bytes.'); process.exit(1); }
console.log(await bcrypt.hash(password, 12));
