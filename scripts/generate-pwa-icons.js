const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
const iconPath = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconPath)) {
  fs.mkdirSync(iconPath, { recursive: true });
}

// Generate a simple colored square as base icon
const baseSize = 512;
const backgroundColor = '#000000';
const iconColor = '#ffffff';

// Create a simple square icon with text
const svg = `
<svg width="${baseSize}" height="${baseSize}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${backgroundColor}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="200" fill="${iconColor}" text-anchor="middle" dominant-baseline="middle">
    N
  </text>
</svg>
`;

// Generate icons for all sizes
sizes.forEach(size => {
  sharp(Buffer.from(svg))
    .resize(size, size)
    .toFile(path.join(iconPath, `icon-${size}x${size}.png`))
    .catch(err => console.error(`Error generating ${size}x${size} icon:`, err));
});
