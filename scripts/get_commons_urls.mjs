import https from 'https';

const getCommonsUrl = (filename) => {
  return new Promise((resolve, reject) => {
    https.get(`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent('File:'+filename)}&prop=imageinfo&iiprop=url&format=json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].imageinfo) {
            resolve(pages[pageId].imageinfo[0].url);
          } else {
            reject('No url found');
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

const files = [
  'Crowd_talking.ogg',
  'Restaurant_ambience.ogg',
  'Office_background_noise.ogg',
  'Coffee_shop_ambience.ogg',
  'Street_noise_with_people.ogg',
  'Boardroom_chatter.ogg',
  'Party_crowd.ogg',
  'News_broadcast_excerpt.ogg',
  'TV_commercials_background.ogg',
  'Sports_crowd_tv.ogg',
  'Talk_show_background.ogg'
];

async function main() {
  for (const f of files) {
    try {
      const url = await getCommonsUrl(f);
      console.log(`${f}: ${url}`);
    } catch (e) {
      console.log(`Failed ${f}`);
    }
  }
}
main();
