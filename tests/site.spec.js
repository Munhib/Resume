import {test,expect} from '@playwright/test';
test('pages, skill filters, project controls, and downloads work',async({page,request})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('net::ERR'))errors.push(m.text());});
 await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('Building intelligence');
 await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});
 await page.getByRole('link',{name:'About',exact:true}).click();await expect(page.getByText('Software Developer Intern')).toBeVisible();
 await page.getByRole('link',{name:'Stack',exact:true}).click();await page.getByRole('button',{name:'Languages',exact:true}).click();await expect(page.locator('.skill-grid img')).toHaveCount(4);await expect(page.getByAltText('Python',{exact:true})).toBeVisible();
 await page.getByRole('link',{name:'Projects',exact:true}).click();await page.getByRole('button',{name:'Next project'}).click();await expect(page.locator('.project-details h2')).toHaveText('MentorOS');
 await expect(page.locator('.carousel [role="img"]')).toHaveCount(4);
 await page.evaluate(async()=>{const faces=[...document.querySelectorAll('.carousel [role="img"]')];await Promise.all(faces.map(face=>new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(new Error('Project artwork failed to load: '+face.firstElementChild.style.backgroundImage));image.src=face.firstElementChild.style.backgroundImage.slice(5,-2);})));});
 await page.screenshot({path:'test-results/projects-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Pause animations'}).click();await expect(page.getByRole('button',{name:'Resume animations'})).toBeVisible();
 await page.getByRole('link',{name:'Contact',exact:true}).click();await expect(page.locator('.email-link')).toHaveAttribute('href','mailto:munhibbaig@gmail.com');await page.reload();await expect(page.locator('h1')).toContainText('conversation');
 for(const file of ['Munhib-Baig-Resume.pdf','Munhib-Baig-AI-ML.pdf']){const response=await request.get('/resumes/'+file);expect(response.ok()).toBeTruthy();expect((await response.body()).subarray(0,4).toString()).toBe('%PDF');}
 expect(errors).toEqual([]);
});
test('mobile navigation and pages fit the viewport',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 for(const name of ['About','Stack','Projects','Contact','Home']){await page.getByRole('button',{name:'Toggle navigation'}).click();await page.getByRole('link',{name,exact:true}).click();await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
 await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
});
