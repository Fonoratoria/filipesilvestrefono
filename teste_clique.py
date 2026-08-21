from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":390,"height":844})
    errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("http://localhost:8899/index.html", wait_until="networkidle"); pg.wait_for_timeout(2000)
    est=lambda: pg.evaluate("""()=>({
      grids:[...document.querySelectorAll('.casos-grid')].map(g=>({itens:g.querySelectorAll('.caso-card').length,
        visiveis:[...g.querySelectorAll('.caso-card')].filter(e=>getComputedStyle(e).display!=='none').length})),
      dif:[...document.querySelectorAll('.diferenciais-grid')].map(g=>[...g.querySelectorAll('.diferencial-card')].filter(e=>getComputedStyle(e).display!=='none').length),
      botoes:document.querySelectorAll('.btn-ver-mais-aval').length})""")
    print('antes :', est())
    for i in range(6):
        bt=pg.query_selector('.btn-ver-mais-aval')
        if not bt: break
        bt.scroll_into_view_if_needed(); bt.click(); pg.wait_for_timeout(300)
    print('depois:', est(), '| erros:', errs[:2])
    # sanfonas abrem?
    pg.evaluate("()=>document.querySelectorAll('details.sanfona').forEach(d=>d.open=true)")
    pg.wait_for_timeout(400)
    print('sanfonas abertas ok | altura final:', pg.evaluate("()=>document.body.scrollHeight"))
    b.close()
