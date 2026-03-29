const https = require('https');
const fs = require('fs');
const path = require('path');

const presets = [
  // 7 Talking / People presets
  { id: 'cafe-chatter', url: 'https://ia800504.us.archive.org/29/items/CoffeeShopAcoustics/coffeeshop.mp3' },
  { id: 'restaurant-crowd', url: 'https://ia600305.us.archive.org/31/items/RestaurantAmbiance/RestaurantAmbiance.mp3' },
  { id: 'office-busyness', url: 'https://ia803209.us.archive.org/2/items/office-ambiance/office-ambiance-1.mp3' },
  { id: 'subdued-boardroom', url: 'https://ia800908.us.archive.org/16/items/MeetingRoomAmbiance/MeetingRoom.mp3' }, // fallback: people murmur
  { id: 'street-chatter', url: 'https://ia803102.us.archive.org/34/items/StreetAmbiance/Street_Ambiance.mp3' },
  { id: 'party-mumble', url: 'https://ia903103.us.archive.org/15/items/CrowdMurmur/CrowdMurmur.mp3' },
  { id: 'lobby-echos', url: 'https://ia800303.us.archive.org/13/items/HotelLobbyAmbiance/HotelLobby.mp3' },

  // 4 TV / News presets
  { id: 'distant-news', url: 'https://ia801908.us.archive.org/26/items/NewsBroadcastBackground/news-broadcast-background.mp3' },
  { id: 'tv-commercials', url: 'https://ia801004.us.archive.org/18/items/tv-ambiance/television-commercials.mp3' },
  { id: 'sports-broadcast', url: 'https://ia600508.us.archive.org/19/items/SportsCrowd/sports-stadium.mp3' },
  { id: 'morning-talkshow', url: 'https://ia802901.us.archive.org/28/items/TalkRadio/TalkRadio.mp3' }
];

// Fallback logic if 404: use a generic white noise / brown noise generator or a known working URL
const fallbackUrl = 'https://ia800504.us.archive.org/29/items/CoffeeShopAcoustics/coffeeshop.mp3'; 

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (response.statusCode >= 400) {
        console.warn(`Failed to download ${url}: ${response.statusCode}, using fallback`);
        // Retry with fallback
        return downloadFile(fallbackUrl, dest).then(resolve).catch(reject);
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
      console.warn(`Error on ${url}: ${err.message}, using fallback`);
      return downloadFile(fallbackUrl, dest).then(resolve).catch(reject);
    });
  });
}

async function main() {
  const outputDir = path.join(__dirname, 'public', 'ambient');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const preset of presets) {
    const dest = path.join(outputDir, `${preset.id}.mp3`);
    console.log(`Downloading ${preset.id}.mp3...`);
    try {
      await downloadFile(preset.url, dest);
      console.log(`✓ ${preset.id}.mp3`);
    } catch (e) {
      console.error(`✗ Failed to download ${preset.id}:`, e);
    }
  }
}

main();
