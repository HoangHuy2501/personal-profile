"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  lockLocations,
  getVisitStats,
  getVisits,
  unlockLocations,
} from "../../services/VisitorServices";
import PasswordDialog from "../admin/PasswordDialog";
import { toast } from 'sonner';
import { motion } from 'motion/react';
const LeafletMap = dynamic(() => import("./VisitorLeafletMap"), {
  ssr: false,
  loading: () => <div className="visitor-map-canvas">Loading map…</div>,
});
export default function VisitorMap() {
  const [unlocked, setUnlocked] = useState(false);
  const [dialog, setDialog] = useState(true);
  const [range, setRange] = useState(30);
  const [stats, setStats] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dates = useMemo(() => {
    const to = new Date();
    const from = new Date(Date.now() - range * 86400000);
    return { from: from.toISOString(), to: to.toISOString() };
  }, [range]);
  async function load() {
    if (!unlocked) return;
    setLoading(true);
    setError("");
    try {
      const [s, r] = await Promise.all([
        getVisitStats(dates.from, dates.to),
        getVisits(dates.from, dates.to, page),
      ]);
      setStats(s);
      setRows(r.items);
      setPages(r.pages);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unable to load dashboard";
      setError(message); toast.error(message, { id: 'visitor-dashboard-error' });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, [unlocked, dates.from, dates.to, page]);
  async function unlock(password: string) {
    await unlockLocations(password); toast.success('Dashboard unlocked');
    setUnlocked(true);
    setDialog(false);
  }
  async function lock() {
    await lockLocations(); toast.message('Dashboard locked');
    setUnlocked(false);
    setStats(null);
    setRows([]);
    setDialog(true);
  }
  if (!unlocked)
    return (
      <div className="page-wrap">
        <div className="surface visitor-lock text-text-light dark:text-text-dark">
          <p className="eyebrow">Private dashboard</p>
          <h1 className="section-title mt-3">Visitor map</h1>
          <p className="muted mt-3">
            Location records stay hidden until you authenticate.
          </p>
          <PasswordDialog
            open={dialog}
            title="Unlock visitor dashboard"
            description="This password is separate from the feedback reply password."
            onClose={() => {}}
            onSubmit={unlock}
          />
        </div>
      </div>
    );
  return (
    <motion.div className="page-wrap visitor-dashboard text-text-light dark:text-text-dark" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
      <div className="flex flex-wrap justify-between gap-4 items-end">
        <div>
          <p className="eyebrow">Visitor intelligence</p>
          <h1 className="section-title mt-2">Estimated access regions</h1>
          <p className="muted mt-3">
            Estimated by IP region; not GPS and not a unique-person count.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={range}
            onChange={(e) => {
              setRange(Number(e.target.value));
              setPage(1);
            }}
            aria-label="Date range"
          >
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
            <option value={365}>365 days</option>
          </select>
          <button className="text-link" onClick={lock}>
            Lock
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {loading && <p className="muted mt-5">Loading…</p>}
      <div className="visitor-stats mt-8">
        <div className="surface">
          <strong>{stats?.total ?? "—"}</strong>
          <span>Total visits</span>
        </div>
        <div className="surface">
          <strong>{stats?.located ?? "—"}</strong>
          <span>Located / partial</span>
        </div>
        <div className="surface">
          <strong>{stats?.unknown ?? "—"}</strong>
          <span>Unknown region</span>
        </div>
      </div>
      {stats && (
        <>
          <div className="surface visitor-chart mt-6">
            <h2 className="font-bold">Visits by day</h2>
            <div className="h-64 mt-3">
              <SimpleChart data={stats.byDay} />
            </div>
          </div>
          <div className="surface mt-6">
            <h2 className="font-bold">Regional map</h2>
            <p className="muted text-sm mt-1">
              Red points represent approximate regional coordinates.
            </p>
            <LeafletMap points={stats.points} />
          </div>
        </>
      )}
      <div className="surface mt-6 overflow-auto">
        <h2 className="font-bold mb-3">Visit records</h2>
        <table className="visitor-table">
          <thead>
            <tr>
              <th>Alias</th>
              <th>Region</th>
              <th>Time</th>
              <th>Source / status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.alias + row.createdAt}>
                <td>{row.alias}</td>
                <td>
                  {[row.city, row.region, row.country]
                    .filter(Boolean)
                    .join(", ") || "Unknown"}
                </td>
                <td>{new Date(row.createdAt).toLocaleString()}</td>
                <td>
                  {row.source} / {row.locationStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-3 mt-4">
          <button
            className="text-link"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            ←
          </button>
          <span>
            {page}/{pages}
          </span>
          <button
            className="text-link"
            disabled={page >= pages}
            onClick={() => setPage(page + 1)}
          >
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
function SimpleChart({ data }: { data: { date: string; visits: number }[] }) {
  return <ResponsiveContainer width="100%" height="100%"><BarChart data={data.slice(-31)} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(value) => String(value).slice(5)} /><YAxis allowDecimals={false} tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="visits" fill="#0f9f8c" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer>;
}
