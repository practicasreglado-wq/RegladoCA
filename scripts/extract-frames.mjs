import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuramos paths base, el script debe correrse desde raíz (npm run ...) o node scripts/...
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, '../public/video');
const rootOutputDir = path.resolve(__dirname, '../public/frames');

if (!fs.existsSync(inputDir)) {
  console.log(`❌ No encuentro la carpeta de entrada: ${inputDir}`);
  console.log('   Por favor, crea la carpeta "public/video" y añade ahí los vídeos .mp4.');
  process.exit(1);
}

if (!fs.existsSync(rootOutputDir)) {
  fs.mkdirSync(rootOutputDir, { recursive: true });
}

// Escanear la carpeta de videos por arhivos mp4
const videoFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.mp4'));

if (videoFiles.length === 0) {
  console.log('⚠️ No hay archivos .mp4 en public/video/');
  process.exit(1);
}

console.log(`🎬 Encontrados ${videoFiles.length} vídeo(s) para procesar.`);

function extractFrames(videoFile) {
  return new Promise((resolve, reject) => {
    const videoName = path.basename(videoFile, path.extname(videoFile));
    const inputPath = path.join(inputDir, videoFile);
    
    // Carpeta independiente para los frames de este vídeo específico
    const outputDir = path.join(rootOutputDir, videoName);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPattern = path.join(outputDir, `frame_%04d.webp`);

    console.log(`\n⏳ Procesando vídeo: ${videoFile}...`);
    console.log(`   Destino: ${outputDir}`);

    // Comando FFmpeg: 
    // -r 30 : 30 frames por segundo
    // -vf scale=1920:-1 : escala a 1920px de ancho y auto el alto
    // -q:v 80 : calidad de webp (0-100)
    const cmd = `ffmpeg -i "${inputPath}" -vf "scale='min(1920,iw)':-1" -r 30 -vcodec libwebp -q:v 80 "${outputPattern}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error procesando ${videoFile}:`, error);
        reject(error);
        return;
      }
      console.log(`✅ ¡Procesado completado para: ${videoFile}!`);
      resolve();
    });
  });
}

// Ejecución secuencial para no sobrecargar el sistema
async function run() {
  for (const video of videoFiles) {
    try {
      await extractFrames(video);
    } catch (e) {
      console.error(e);
    }
  }
  console.log('\n🎉 ¡Todos los vídeos han sido procesados!');
}

run();
