import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'public', 'assets');

const imageList = {
  native: [
    { file: 'yam.jpg', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80' },
    { file: 'cassava.jpg', url: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=800&q=80' },
    { file: 'garri.jpg', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80' },
    { file: 'plantain.jpg', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80' },
    { file: 'groundnut.jpg', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80' },
    { file: 'palm-oil.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
    { file: 'maize.jpg', url: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&q=80' },
    { file: 'millet.jpg', url: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&q=80' },
    { file: 'honey.jpg', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80' },
    { file: 'egusi.jpg', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80' },
    { file: 'okra.jpg', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80' },
    { file: 'bitter-leaf.jpg', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80' },
    { file: 'goat.jpg', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&q=80' },
    { file: 'sheep.jpg', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&q=80' },
    { file: 'chicken.jpg', url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80' },
    { file: 'cow.jpg', url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80' },
    { file: 'pig.jpg', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&q=80' },
    { file: 'rabbit.jpg', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80' },
    { file: 'grasscutter.jpg', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&q=80' },
    { file: 'snail.jpg', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80' },
    { file: 'hoe.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'cutlass.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'axe.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'shovel.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'rake.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'sickle.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'basket.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'clay-pot.jpg', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80' },
    { file: 'calabash.jpg', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80' },
    { file: 'mortar.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
  ],
  modern: [
    { file: 'rice-packaging.jpg', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80' },
    { file: 'canned-corn.jpg', url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80' },
    { file: 'pasta.jpg', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80' },
    { file: 'spices.jpg', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80' },
    { file: 'frozen-vegetables.jpg', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80' },
    { file: 'yogurt.jpg', url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=80' },
    { file: 'broiler-farm.jpg', url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80' },
    { file: 'fish-farm.jpg', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80' },
    { file: 'dairy-farm.jpg', url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80' },
    { file: 'piggery.jpg', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&q=80' },
    { file: 'turkey-farm.jpg', url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80' },
    { file: 'tractor.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'harvester.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'irrigation.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'greenhouse.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'drone.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'chainsaw.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'solar-panel.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'cold-storage.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'water-pump.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'incubator.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'packaging-machine.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'weighing-scale.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
    { file: 'pellet-machine.jpg', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
  ],
};

async function downloadImage(url, filePath) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const buffer = Buffer.from(await resp.arrayBuffer());
    writeFileSync(filePath, buffer);
    return true;
  } catch (err) {
    return false;
  }
}

async function main() {
  for (const [era, images] of Object.entries(imageList)) {
    const eraDir = join(ASSETS_DIR, era);
    mkdirSync(eraDir, { recursive: true });
    for (const { file, url } of images) {
      const filePath = join(eraDir, file);
      if (existsSync(filePath)) continue;
      const ok = await downloadImage(url, filePath);
      if (ok) console.log(`✓ ${era}/${file}`);
    }
  }
}

main().catch(console.error);
