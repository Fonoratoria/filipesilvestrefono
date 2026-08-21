from playwright.sync_api import sync_playwright
out="C:/Users/filip/AppData/Local/Temp/claude/C--Users-filip/9a3f9648-1aac-4f1f-824c-3e9ca11493a1/scratchpad/"
with sync_playwright() as p:
    b=p.chromium.launch()
    for pag in ["voz.html","disfagia.html"]:
        for tag,w,h in [("m",390,844),("d",1280,800)]:
            pg=b.new_page(viewport={"width":w,"height":h})
            errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
            pg.goto("http://localhost:8899/"+pag, wait_until="networkidle"); pg.wait_for_timeout(1800)
            print(pag, tag, pg.evaluate("""()=>({telas:+(document.body.scrollHeight/innerHeight).toFixed(1),
              scrollX:document.documentElement.scrollWidth>innerWidth,
              tamanhos:[...new Set([...document.querySelectorAll('body *')].filter(e=>e.textContent&&!e.children.length).map(e=>getComputedStyle(e).fontSize))].length})"""), errs[:2])
            pg.evaluate("()=>{const c=document.getElementById('cookie-banner'); if(c) c.style.display='none';}")
            pg.screenshot(path=out+"l-%s-%s.png"%(tag,pag.replace('.html','')))
            pg.close()
    b.close()
