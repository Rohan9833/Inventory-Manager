import "../../css/HomeHero.css";

function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero-content">

        <span className="home-hero-label">
          INVENTORY MADE SIMPLE
        </span>

        <h1>
          Control Today,
          <br />
          <span>Build Tomorrow.</span>
        </h1>

        <p>
          Track stock, streamline operations and keep your
          <br />
          business moving forward with the power of AI.
        </p>

        <div className="home-hero-buttons">
          <button className="home-hero-add-btn">
            <span>＋</span>
            Add Product
          </button>

          <button className="home-hero-ai-btn">
            <span>✦</span>
            Use AI
          </button>
        </div>

      </div>
    </section>
  );
}

export default HomeHero;