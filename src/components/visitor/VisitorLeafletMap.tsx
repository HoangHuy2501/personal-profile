"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useLanguage } from "../../hook/useLanguage";

type VisitorPoint = {
  alias: string;
  latitude: number;
  longitude: number;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  createdAt: string;
};

export default function VisitorLeafletMap({ points }: { points: VisitorPoint[] }) {
  const { lang, t } = useLanguage();
  const copy = t.visitor;
  const center: [number, number] = points[0]
    ? [points[0].latitude, points[0].longitude]
    : [20, 0];
  const locale = lang === "vi-VN" ? "vi-VN" : "en-US";

  return (
    <div className="visitor-map-canvas">
      <MapContainer center={center} zoom={points.length ? 4 : 2} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution={copy.mapAttribution} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((point) => {
          const region = [point.city, point.region, point.country].filter(Boolean).join(", ") || copy.unknown;
          return (
            <CircleMarker key={`${point.alias}-${point.createdAt}`} center={[point.latitude, point.longitude]} radius={7} pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.8 }}>
              <Popup>
                <strong>{copy.mapAlias}: {point.alias}</strong>
                <br />
                {copy.mapRegion}: {region}
                <br />
                {copy.mapTime}: {new Date(point.createdAt).toLocaleString(locale)}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
