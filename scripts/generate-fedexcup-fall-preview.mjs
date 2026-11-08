import fs from 'node:fs';
import sharp from 'sharp';
// Preserve the real course photograph; typography is a separate transparent layer.
const root='public/images/articles/fedexcup-fall-finale-preview-2026';
const photo=await sharp('public/images/news/sea-island-dan-perry-2007.jpg').resize(800,630,{fit:'cover',position:'centre'}).toBuffer();
const overlay=await sharp('public/images/news/sea-island-cover-overlay.webp').resize(1200,630,{fit:'fill'}).toBuffer();
const shade=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="shade"><stop offset="0%" stop-color="#092316"/><stop offset="33.4%" stop-color="#092316"/><stop offset="68%" stop-color="#092316" stop-opacity="0"/><stop offset="100%" stop-color="#092316" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#shade)"/></svg>');
const cover=await sharp({create:{width:1200,height:630,channels:4,background:'#092316'}}).composite([{input:photo,left:400,top:0},{input:shade,left:0,top:0},{input:overlay,left:0,top:0}]).png().toBuffer();
await sharp(cover).png({compressionLevel:9}).toFile(root+'.png');
await sharp(cover).webp({quality:90}).toFile(root+'.webp');
await sharp(cover).resize(600).webp({quality:86}).toFile(root+'-600.webp');
