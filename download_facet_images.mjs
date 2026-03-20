#!/usr/bin/env node
/**
 * Facet Furniture Image Library Downloader
 * =========================================
 * Double-click this file to run (requires Node.js from nodejs.org)
 * 
 * Or from any terminal / command prompt:
 *   node download_facet_images.mjs
 * 
 * Creates organized folders with all 102 images right where this file is.
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, 'facet_furniture_images');

const IMAGES = [
  {
    "folder": "00_branding",
    "filename": "logo_icon_500.png",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/10/icon500.png"
  },
  {
    "folder": "00_branding",
    "filename": "logo_header.png",
    "url": "https://facetfurniture.com/wp-content/uploads/2023/08/cropped-facetlogo2.png"
  },
  {
    "folder": "00_branding",
    "filename": "logo_header_cropped.png",
    "url": "https://facetfurniture.com/wp-content/uploads/2023/08/cropped-cropped-facetlogo2.png"
  },
  {
    "folder": "00_branding",
    "filename": "logo_original.png",
    "url": "https://facetfurniture.com/wp-content/uploads/2018/07/facetlogo2.png"
  },
  {
    "folder": "01_eisberg_entry_table",
    "filename": "back_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/backside-5.jpg"
  },
  {
    "folder": "01_eisberg_entry_table",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/front-16.jpg"
  },
  {
    "folder": "01_eisberg_entry_table",
    "filename": "frontside_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-15.jpg"
  },
  {
    "folder": "01_eisberg_entry_table",
    "filename": "side_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/sidedetails-2.jpg"
  },
  {
    "folder": "01_eisberg_entry_table",
    "filename": "top_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/top-8.jpg"
  },
  {
    "folder": "01_eisberg_entry_table",
    "filename": "top_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/topdetails-9.jpg"
  },
  {
    "folder": "02_prodigieux_credenza",
    "filename": "front_top.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/fronttop-5.jpg"
  },
  {
    "folder": "02_prodigieux_credenza",
    "filename": "frontside_top.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontsidetop-5.jpg"
  },
  {
    "folder": "02_prodigieux_credenza",
    "filename": "side_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/side-19.jpg"
  },
  {
    "folder": "02_prodigieux_credenza",
    "filename": "topside_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/topsidedetails-2.jpg"
  },
  {
    "folder": "02_prodigieux_credenza",
    "filename": "foot_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/footdetails-2.jpg"
  },
  {
    "folder": "03_phylo_hutch",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontlighter-2.jpg"
  },
  {
    "folder": "03_phylo_hutch",
    "filename": "frontside.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/Phylo-frontside-2.jpg"
  },
  {
    "folder": "03_phylo_hutch",
    "filename": "open_doors.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/Phylo-OpenDoors-2.jpg"
  },
  {
    "folder": "03_phylo_hutch",
    "filename": "drawer_closeup.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/Phylo-DrawerCloseup-2.jpg"
  },
  {
    "folder": "03_phylo_hutch",
    "filename": "one_door_open.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/Phylo-OneDoor-2.jpg"
  },
  {
    "folder": "04_motley_coffee_table",
    "filename": "frontside_top.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-3-5.jpg"
  },
  {
    "folder": "04_motley_coffee_table",
    "filename": "marble_detail.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/marbledetail-2.jpg"
  },
  {
    "folder": "04_motley_coffee_table",
    "filename": "parchment_detail.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/parchmentdetail-2.jpg"
  },
  {
    "folder": "04_motley_coffee_table",
    "filename": "side_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/side-1-10.jpg"
  },
  {
    "folder": "04_motley_coffee_table",
    "filename": "frontside.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontsidetop-4.jpg"
  },
  {
    "folder": "04_motley_coffee_table",
    "filename": "top_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/top-1-3.jpg"
  },
  {
    "folder": "04_motley_coffee_table",
    "filename": "front_top.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/fronttop-4.jpg"
  },
  {
    "folder": "05_leverage_dining_table",
    "filename": "frontside_top.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-14.jpg"
  },
  {
    "folder": "05_leverage_dining_table",
    "filename": "base_detail.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/base-2.jpg"
  },
  {
    "folder": "05_leverage_dining_table",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/front-15.jpg"
  },
  {
    "folder": "05_leverage_dining_table",
    "filename": "top_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/top-7.jpg"
  },
  {
    "folder": "06_radiate_bar",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/front-2-8.jpg"
  },
  {
    "folder": "06_radiate_bar",
    "filename": "frontside.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-1-13.jpg"
  },
  {
    "folder": "06_radiate_bar",
    "filename": "grain_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/details-2-7.jpg"
  },
  {
    "folder": "06_radiate_bar",
    "filename": "side_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/side-2-8.jpg"
  },
  {
    "folder": "06_radiate_bar",
    "filename": "handle_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/handle-2-3.jpg"
  },
  {
    "folder": "07_mariana_curio",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/front-1-10.jpg"
  },
  {
    "folder": "07_mariana_curio",
    "filename": "front_open.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontopen-6.jpg"
  },
  {
    "folder": "07_mariana_curio",
    "filename": "side_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/side-17.jpg"
  },
  {
    "folder": "07_mariana_curio",
    "filename": "interior_light.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/light-4.jpg"
  },
  {
    "folder": "07_mariana_curio",
    "filename": "leg_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/details-15.jpg"
  },
  {
    "folder": "07_mariana_curio",
    "filename": "handle_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/handle-7.jpg"
  },
  {
    "folder": "08_juxtapo_side_table",
    "filename": "tall.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/tall-3.jpg"
  },
  {
    "folder": "08_juxtapo_side_table",
    "filename": "top_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/topdetails-7.jpg"
  },
  {
    "folder": "08_juxtapo_side_table",
    "filename": "medium.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/medium-3.jpg"
  },
  {
    "folder": "08_juxtapo_side_table",
    "filename": "small.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/small-3.jpg"
  },
  {
    "folder": "08_juxtapo_side_table",
    "filename": "group_of_3.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/3tables-3.jpg"
  },
  {
    "folder": "08_juxtapo_side_table",
    "filename": "tall_and_medium.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/TallandMedium-3.jpg"
  },
  {
    "folder": "09_scoop_mirror",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/front-3-2.jpg"
  },
  {
    "folder": "10_juxtapo_coffee_table",
    "filename": "frontside.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-3-4.jpg"
  },
  {
    "folder": "10_juxtapo_coffee_table",
    "filename": "corner_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/corner-2.jpg"
  },
  {
    "folder": "10_juxtapo_coffee_table",
    "filename": "top_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/top-6.jpg"
  },
  {
    "folder": "11_lindey_vanity_lex_desk",
    "filename": "frontside.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-13.jpg"
  },
  {
    "folder": "11_lindey_vanity_lex_desk",
    "filename": "front_open.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontopen-5.jpg"
  },
  {
    "folder": "11_lindey_vanity_lex_desk",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/front-14.jpg"
  },
  {
    "folder": "11_lindey_vanity_lex_desk",
    "filename": "drawer_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/detailsdrawer-2.jpg"
  },
  {
    "folder": "11_lindey_vanity_lex_desk",
    "filename": "closeup_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/details-14.jpg"
  },
  {
    "folder": "11_lindey_vanity_lex_desk",
    "filename": "side_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/side-16.jpg"
  },
  {
    "folder": "12_pure_chair",
    "filename": "frontside.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-12.jpg"
  },
  {
    "folder": "13_robin_bedside_table",
    "filename": "frontside.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-2-4.jpg"
  },
  {
    "folder": "13_robin_bedside_table",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/front-1-8.jpg"
  },
  {
    "folder": "13_robin_bedside_table",
    "filename": "drawer.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/drawer-1.jpg"
  },
  {
    "folder": "13_robin_bedside_table",
    "filename": "handle_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/handle-6.jpg"
  },
  {
    "folder": "13_robin_bedside_table",
    "filename": "side_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/details2-6.jpg"
  },
  {
    "folder": "13_robin_bedside_table",
    "filename": "leg_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/details-1-5.jpg"
  },
  {
    "folder": "13_robin_bedside_table",
    "filename": "side_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/side-2-6.jpg"
  },
  {
    "folder": "14_radiate_table",
    "filename": "white_oak_front.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/WhiteOak_NewBase_WhiteWash-1.jpg"
  },
  {
    "folder": "14_radiate_table",
    "filename": "white_oak_top.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/whiteoak_top-1.jpg"
  },
  {
    "folder": "14_radiate_table",
    "filename": "white_oak_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/whiteoak_details-1.jpg"
  },
  {
    "folder": "14_radiate_table",
    "filename": "walnut_top.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/walnut_top-1.jpg"
  },
  {
    "folder": "14_radiate_table",
    "filename": "walnut_front.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/walnut_front-1.jpg"
  },
  {
    "folder": "14_radiate_table",
    "filename": "white_finish_top.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/radiate-table-top-whitefinish-1.jpg"
  },
  {
    "folder": "15_dove_mirror",
    "filename": "side_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/side-3-4.jpg"
  },
  {
    "folder": "15_dove_mirror",
    "filename": "dovetail_details.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/details-2-6.jpg"
  },
  {
    "folder": "15_dove_mirror",
    "filename": "front_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/front-2-7.jpg"
  },
  {
    "folder": "16_frankie_bed",
    "filename": "frontside.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/frontside-1-11.jpg"
  },
  {
    "folder": "16_frankie_bed",
    "filename": "side_view.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/side-1-8.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "ghost_white_grey_cerused.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/01/GhostWhite-GreyCerused-Oak.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "ghost_white_living.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/01/GhostWhiteLiving-Oak.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "jet_ghost_cerused.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/02/jetwhitecerused.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "jet_grey_cerused.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/01/jetgraycerused.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "natural_ghost_cerused.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/01/Natural-GhostCerused-Oak.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "natural_grey_cerused.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/12/Natural-GreyCerused-Oak.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "natural_white_oak.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2018/12/img0496.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "overcast_white_cerused.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/06/OvercastWhiteCerused.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "smoke_pure_living.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/02/smokepure.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "smoke_white_living.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2018/12/SmokeWhiteLiving-WhiteOak2.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "white_5_percent.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/02/White5.jpg"
  },
  {
    "folder": "finishes_white_oak",
    "filename": "white_out_shadow_cerused.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/06/WhiteOutShadowCerused.jpg"
  },
  {
    "folder": "finishes_walnut",
    "filename": "gray_ash.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/04/GrayAshSwatch-1.jpg"
  },
  {
    "folder": "finishes_walnut",
    "filename": "natural_walnut.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/01/Natural-Walnut.jpg"
  },
  {
    "folder": "finishes_walnut",
    "filename": "pure_living.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/02/PureLiving.jpg"
  },
  {
    "folder": "finishes_walnut",
    "filename": "shade_pure_living.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2018/12/ShadePureLiving-Walnut.jpg"
  },
  {
    "folder": "finishes_walnut",
    "filename": "shadow.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/01/Shadow-Walnut.jpg"
  },
  {
    "folder": "finishes_walnut",
    "filename": "silver_lining_living.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2018/12/SilverLiningLiving-Walnut.jpg"
  },
  {
    "folder": "finishes_reclaimed_oak",
    "filename": "ghost_white_grey_cerused.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/01/GhostWhite-GreyCerused-ReclaimedOak.jpg"
  },
  {
    "folder": "finishes_reclaimed_oak",
    "filename": "ghost_white_living.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2019/01/GhostWhiteLiving-ReclaimedOak.jpg"
  },
  {
    "folder": "finishes_reclaimed_oak",
    "filename": "silver_lining_living.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2018/12/SilverLiningLiving-ReclaimedOak.jpg"
  },
  {
    "folder": "blog_lifestyle",
    "filename": "tv_stand_in_room.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/04/TVstand_Location2-scaled-1-1024x683.jpg"
  },
  {
    "folder": "blog_lifestyle",
    "filename": "eisberg_thumbnail.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2020/05/Eisberg-300x200.jpg"
  },
  {
    "folder": "blog_lifestyle",
    "filename": "juxtapo_side_about.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2018/09/JuxtapoSideTable.jpg"
  },
  {
    "folder": "blog_lifestyle",
    "filename": "robin_bedside_in_home.jpg",
    "url": "https://facetfurniture.com/wp-content/uploads/2018/09/RobinBedsideTable.jpg"
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    mod.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { fs.unlinkSync(dest); reject(e); });
  });
}

async function main() {
  console.log('');
  console.log('='.repeat(60));
  console.log('  FACET FURNITURE IMAGE LIBRARY DOWNLOADER');
  console.log('  Images: ' + IMAGES.length);
  console.log('  Output: ' + OUTPUT);
  console.log('='.repeat(60));
  console.log('');

  if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

  let ok = 0, fail = 0;
  for (let i = 0; i < IMAGES.length; i++) {
    const { folder, filename, url } = IMAGES[i];
    const dir = path.join(OUTPUT, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, filename);
    
    process.stdout.write(`  [${i+1}/${IMAGES.length}] ${folder}/${filename} ... `);
    try {
      await download(url, dest);
      const size = (fs.statSync(dest).size / 1024).toFixed(1);
      console.log(`OK (${size} KB)`);
      ok++;
    } catch (e) {
      console.log(`FAILED (${e.message})`);
      fail++;
    }
  }

  // Write manifest
  const manifest = {};
  for (const img of IMAGES) {
    if (!manifest[img.folder]) manifest[img.folder] = {};
    manifest[img.folder][img.filename] = img.url;
  }
  fs.writeFileSync(path.join(OUTPUT, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log('');
  console.log('='.repeat(60));
  console.log(`  DONE! ${ok} downloaded, ${fail} failed`);
  console.log(`  Files in: ${OUTPUT}`);
  console.log('='.repeat(60));
  console.log('');
  console.log('Press any key to close...');
  
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', () => process.exit(0));
}

main().catch(console.error);
