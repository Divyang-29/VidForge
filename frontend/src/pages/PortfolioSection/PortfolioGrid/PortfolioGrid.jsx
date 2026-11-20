import "./PortfolioGrid.css";

const LEFT_ITEMS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80",
    title: "Fashion and Trending",
    category: "Trend / Fashion",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
    title: "Voiceover and Narration",
    category: "Developing / Photography",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    title: "Fashion & Trending",
    category: "Trend / Fashion",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    title: "Voiceover and Narration",
    category: "Developing / Photography",
  },
];

const RIGHT_ITEMS = [
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
    title: "Corporate Branding",
    category: "Vediography / Photography",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80",
    title: "Visual Effects Sounds",
    category: "Animation / Photography",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?w=600&q=80",
    title: "Prototype Handaling",
    category: "Vediography / Photography",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    title: "Visual Effects Sounds",
    category: "Animation / Photography",
  },
];

function PortfolioItem({ item, large }) {
  return (
    <div className={`pg-item ${large ? "pg-item--large" : "pg-item--small"}`}>
      <div className="pg-img-wrap">
        <img loading="lazy" decoding="async" src={item.image} alt={item.title} className="pg-img" />
      </div>
      <div className="pg-info">
        <h3 className="pg-title">{item.title}</h3>
        <p className="pg-category">{item.category}</p>
      </div>
    </div>
  );
}

export default function PortfolioGrid() {
  return (
    <div className="pg-page">
      <div className="pg-grid">
        {/* Left column — tall portrait images */}
        <div className="pg-col pg-col--left">
          {LEFT_ITEMS.map((item) => (
            <PortfolioItem key={item.id} item={item} large />
          ))}
        </div>

        {/* Right column — smaller landscape images, offset down */}
        <div className="pg-col pg-col--right">
          {RIGHT_ITEMS.map((item) => (
            <PortfolioItem key={item.id} item={item} large={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
