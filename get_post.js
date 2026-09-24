const fs = require('fs');
const path = './src/data/posts.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const slug = process.argv[2];
const post = data.find(p => p.slug === slug);
if (post) {
  console.log(`--- POST: ${slug} ---`);
  console.log(`Length: ${post.content.replace(/\s+/g, '').length}`);
  console.log(post.content);
} else {
  console.log(`Post not found: ${slug}`);
}
