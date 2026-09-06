
import Home from '../page/Home';
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nguyễn Hoàng Huy",
  alternateName: [
    "Nguyen Hoang Huy",
    "Hoang Huy Portfolio",
  ],
  url: "https://nguyen-hoang-huy.vercel.app/",
};
export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
        <Home />
    </main>
  );
}
