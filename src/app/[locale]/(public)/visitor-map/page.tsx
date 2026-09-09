import VisitorMap from "../../../../page/VisitorMap";
import en from "../../../../locales/en";
import vi from "../../../../locales/vi";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = locale === "vi" ? vi.visitor : en.visitor;
  return {
    title: copy.unlockTitle,
    robots: { index: false, follow: false },
  };
}
export default function VisitorMapPage() {
  return <VisitorMap />;
}
