import { mkdir } from 'node:fs';

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
mkdir('/tmp', { recursive: true }, (err) => {
  if (err) throw err;
}); 