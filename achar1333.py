from playwright.sync_api import sync_playwright
JS="""()=>[...document.querySelectorAll('body *')].filter(e=>e.children.length===0&&e.textContent.trim()&&
 ['13.3333px','16.64px','16.8px','22.4px','24px'].includes(getComputedStyle(e).fontSize))
 .map(e=>({tam:getComputedStyle(e).fontSize,tag:e.tagName,cls:String(e.className||'').slice(0,30),txt:e.textContent.trim().slice(0,30)})).slice(0,14)"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":390,"height":844})
    pg.goto("http://localhost:8899/index.html", wait_until="networkidle"); pg.wait_for_timeout(1500)
    for x in pg.evaluate(JS): print(x)
    b.close()
