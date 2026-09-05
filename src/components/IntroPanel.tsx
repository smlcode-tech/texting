function IntroPanel() {
  return (
    <section className="intro-panel">
      <div className="brand-row"><div className="brand-mark" aria-hidden="true">t</div><strong>texting</strong></div>
      <div className="intro-copy">
        <span className="eyebrow">SÖZÜNÜN YERİ</span>
        <h1>Yakın olanla<br /><em>anında</em> konuş.</h1>
        <p>Duraksamadan paylaş. Küçük anları, önemli haberleri ve aradaki her şeyi tek bir yerde tut.</p>
      </div>
      <div className="signal"><span className="status-dot" /> Her zaman bağlı</div>
    </section>
  )
}

export default IntroPanel