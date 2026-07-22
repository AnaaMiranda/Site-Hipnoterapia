/**
 * Pipeline de imagens — Site Juliane Machado
 * -------------------------------------------------------------
 * Recorta, faz uma gradação de cor suave (para unificar fotos de
 * iluminações diferentes), gera WebP + JPG otimizados e um blur
 * placeholder base64, além de um manifesto tipado com dimensões.
 *
 * Uso:  npm run images
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "fotos-originais", "Criativos Juliane Machado");
const OUT_DIR = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "src", "lib", "images.generated.json");

// role → arquivo de origem + enquadramento
const JOBS = [
  { src: "IMG_4731", out: "hero", w: 1240, h: 1550, pos: "attention" }, // 4:5 retrato principal
  { src: "IMG_4084", out: "sobre", w: 1080, h: 1350, pos: "attention" },
  { src: "IMG_4763", out: "ciencia-livro", w: 1080, h: 1350, pos: "attention" },
  // Open Graph (paisagem social) — banda horizontal centrada no rosto
  { src: "IMG_4731", out: "og", w: 1200, h: 630, band: 0.2 },
];

async function resolveSource(base) {
  const files = await readdir(SRC_DIR);
  const match = files.find(
    (f) => f.toLowerCase() === `${base.toLowerCase()}.jpg`,
  );
  if (!match) throw new Error(`Origem não encontrada: ${base}`);
  return path.join(SRC_DIR, match);
}

/** Gradação suave e consistente — sem distorcer a pele. */
function grade(pipeline) {
  return pipeline
    .modulate({ saturation: 1.04, brightness: 1.015 })
    .linear(1.02, -2) // micro-contraste
    .sharpen({ sigma: 0.6 });
}

async function run() {
  if (!existsSync(SRC_DIR)) {
    console.error(`\n✖ Pasta de fotos não encontrada:\n  ${SRC_DIR}\n`);
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });

  const manifest = {};

  for (const job of JOBS) {
    const srcPath = await resolveSource(job.src);

    let cropped;
    if (typeof job.band === "number") {
      // Extrai uma banda horizontal (para recorte paisagem com rosto)
      const meta = await sharp(srcPath).rotate().metadata();
      const scaledH = Math.round(meta.height * (job.w / meta.width));
      let top = Math.round(scaledH * job.band);
      if (top + job.h > scaledH) top = scaledH - job.h;
      cropped = grade(
        sharp(srcPath)
          .rotate()
          .resize(job.w, scaledH)
          .extract({ left: 0, top, width: job.w, height: job.h }),
      );
    } else {
      cropped = grade(
        sharp(srcPath).rotate().resize(job.w, job.h, {
          fit: "cover",
          position: job.pos,
        }),
      );
    }

    // WebP principal
    await cropped
      .clone()
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(OUT_DIR, `${job.out}.webp`));

    // Fallback JPG
    await cropped
      .clone()
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(OUT_DIR, `${job.out}.jpg`));

    // Blur placeholder base64 (evita layout shift, LCP suave)
    const blur = await sharp(srcPath)
      .rotate()
      .resize(20, Math.round((20 * job.h) / job.w), { fit: "cover", position: job.pos })
      .webp({ quality: 40 })
      .toBuffer();

    manifest[job.out] = {
      src: `/images/${job.out}.webp`,
      fallback: `/images/${job.out}.jpg`,
      width: job.w,
      height: job.h,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    };

    console.log(`✓ ${job.out}  (${job.w}×${job.h})`);
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\n✓ Manifesto: ${path.relative(ROOT, MANIFEST)}`);
  console.log(`✓ ${JOBS.length} imagens processadas.\n`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
