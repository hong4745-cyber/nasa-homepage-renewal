import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true, args: ['--no-sandbox'],
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5175/', { waitUntil: 'networkidle', timeout: 20000 });

// 1) 로딩화면
await page.waitForTimeout(1000);
await page.screenshot({ path: 'final_01_loading.png' });

// 2) 로딩 완료 후 Hero
await page.waitForTimeout(5000);
await page.screenshot({ path: 'final_02_hero.png' });

// 3) 지구 진입 중간
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: 'final_03_earth_enter.png' });

// 4) 타임라인 (GSAP PIN 중간)
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.5, behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: 'final_04_timeline.png' });

// 5) 솔라 익스플로러
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.44, behavior: 'instant' }));
await page.waitForTimeout(1000);
await page.screenshot({ path: 'final_05_solar.png' });

// 6) 뉴스 섹션
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.62, behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: 'final_06_news.png' });

// 7) Explore 탭
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.77, behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: 'final_07_explore.png' });

// 8) 갤러리
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.89, behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: 'final_08_gallery.png' });

// 9) 푸터
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: 'final_09_footer.png' });

await browser.close();
console.log('All screenshots done');
