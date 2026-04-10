import ffmpeg from 'ffmpeg-static';
import { exec } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

/**
 * SCRIPT DE OPTIMIZACIÓN Y EXTRACCIÓN DE FOTOGRAMAS
 * Este script automatiza la conversión de archivos de vídeo (MP4) en secuencias 
 * de imágenes WebP optimizadas para su uso en técnicas de scroll-scrubbing (Canvas).
 */

// Configuración de rutas internas (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validación de argumentos de entrada
const inputName = process.argv[2];
if (!inputName) {
  console.error('❌ Argumento faltante. Especifica el nombre de tu vídeo. Ejemplo: node scripts/generate-frames.mjs video.mp4');
  process.exit(1);
}

// Definición de nombres base y rutas de archivos
const videoBaseName = inputName.replace('.mp4', '');
const inputPath = join(__dirname, '..', 'public', 'video', inputName);
const outputDir = join(__dirname, '..', 'public', 'frames', videoBaseName);

// Verificación de integridad: el archivo de vídeo debe existir
if (!fs.existsSync(inputPath)) {
  console.error(`❌ Error: No se ha encontrado el archivo fuente en ${inputPath}`);
  process.exit(1);
}

/**
 * GESTIÓN DE DIRECTORIOS
 * Limpiamos la carpeta de destino para evitar conflictos con extracciones anteriores
 * y garantizamos que la estructura de carpetas necesaria exista.
 */
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

console.log(`🎬 Iniciando proceso de extracción (WebP) para: ${inputName}`);
console.log(`📂 Destino de salida: /public/frames/${videoBaseName}/`);
console.log('------------------------------------------------------');

/**
 * CONFIGURACIÓN DE FFmpeg
 * -vf "scale='min(1920,iw)':-2": Normaliza el ancho a 1920px máximo para optimizar memoria RAM.
 * fps=30: Estandariza la tasa de cuadros para cálculos precisos en GSAP.
 * -vcodec libwebp: Utiliza el códec WebP para obtener el mejor balance calidad/peso.
 * -q:v 75: Calidad del 75%, ideal para carga web sin pérdida visual perceptible.
 * "frame_%04d.webp": Formato de salida numerado compatible con CanvasVideoBackground.vue.
 */
const command = `"${ffmpeg}" -i "${inputPath}" -vf "scale='min(1920,iw)':-2,fps=30" -pix_fmt yuv420p -vcodec libwebp -lossless 0 -q:v 95 "${join(outputDir, 'frame_%04d.webp')}"`;

// Ejecución del comando de sistema
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error crítico durante la extracción de fotogramas:', error.message);
    return;
  }

  // Recuento final y feedback al desarrollador
  const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
  console.log(`✅ ¡Proceso completado con éxito!`);
  console.log(`📸 Total fotogramas generados: ${files.length} unidades.`);
  console.log(`------------------------------------------------------`);
  console.log(`⚠️  RECUERDA: Actualiza 'frameCount' en tu vista web con el valor [${files.length}] para [${videoBaseName}].`);
});
