const fs = require('fs');
const path = './src/data/posts.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const slugs = [
  'freelance-independence-guide',
  'coconala-earn-50k',
  'freelance-portfolio-howto',
  'freelance-security-checklist',
  'it-ai-skill-learning'
];

for (const slug of slugs) {
  const post = data.find(p => p.slug === slug);
  if (post) {
    fs.writeFileSync(`/Users/ishikawagai/.gemini/antigravity/brain/b4ec5eee-a4d5-47a3-8211-a9a6751bb6d1/scratch/${slug}.md`, post.content);
    console.log(`Saved ${slug}.md, Length: ${post.content.replace(/\s+/g, '').length}`);
  }
}
