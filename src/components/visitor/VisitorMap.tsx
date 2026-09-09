"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useLanguage } from "../../hook/useLanguage";
import {
  lockLocations,
  getVisitStats,
  getVisits,
  unlockLocations,
} from "../../services/VisitorServices";
import PasswordDialog from "../admin/PasswordDialog";
import { useRouter } from "next/navigation";

function LeafletLoading() {
  const { t } = useLanguage();
  return <div className="visitor-map-canvas">{t.visitor.mapLoading}</div>;
}

const LeafletMap = dynamic(() => import("./VisitorLeafletMap"), {
  ssr: false,
  loading: () => <LeafletLoading />,
});

function dashboardError(error: unknown, copy: any) {
  const code = error instanceof Error ? error.message : "";
  if (
    code === "stats" ||
    code === "visits" ||
    code.includes("Visits") ||
    code.includes("Stats")
  )
    return copy.errors.load;
  return copy.errors.unknown;
}

export default function VisitorMap() {
  const { lang, t } = useLanguage();
  const copy = t.visitor;
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
  const router = useRouter();

  useEffect(() => {
    if (!unlocked) return;
    setLoading(true);
    setError("");
    Promise.all([
      getVisitStats(dates.from, dates.to),
      getVisits(dates.from, dates.to, page),
    ])
      .then(([nextStats, nextRows]) => {
        setStats(nextStats);
        setRows(nextRows.items);
        setPages(nextRows.pages);
      })
      .catch((loadError) => {
        const message = dashboardError(loadError, copy);
        setError(message);
        toast.error(message, { id: "visitor-dashboard-error" });
      })
      .finally(() => setLoading(false));
  }, [copy, dates.from, dates.to, page, unlocked]);

  async function unlock(password: string) {
    await unlockLocations(password);
    toast.success(copy.unlocked);
    setUnlocked(true);
    setDialog(false);
  }

  async function lock() {
    await lockLocations();
    toast.message(copy.locked);
    setUnlocked(false);
    setStats(null);
    setRows([]);
    setDialog(true);
  }

  if (!unlocked) {
    return (
      <div className="page-wrap">
        <div className="surface visitor-lock text-text-light dark:text-text-dark">
          <p className="eyebrow">{copy.privateEyebrow}</p>
          <h1 className="section-title mt-3">{copy.mapTitle}</h1>
          <p className="muted mt-3">{copy.hiddenDescription}</p>
          <PasswordDialog
            open={dialog}
            title={copy.unlockTitle}
            description={copy.unlockDescription}
            onClose={() => router.back()}
            onSubmit={unlock}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="page-wrap visitor-dashboard text-text-light dark:text-text-dark"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-wrap justify-between gap-4 items-end">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="section-title mt-2">{copy.heading}</h1>
          <p className="muted mt-3">{copy.description}</p>
        </div>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="visitor-date-range">
            {copy.dateRangeLabel}
          </label>
          <select
            id="visitor-date-range"
            value={range}
            onChange={(event) => {
              setRange(Number(event.target.value));
              setPage(1);
            }}
          >
            <option value={7}>{copy.dateRanges.days7}</option>
            <option value={30}>{copy.dateRanges.days30}</option>
            <option value={90}>{copy.dateRanges.days90}</option>
            <option value={365}>{copy.dateRanges.days365}</option>
          </select>
          <button className="text-link" onClick={() => void lock()}>
            {copy.lock}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {loading && <p className="muted mt-5">{copy.loading}</p>}
      <div className="visitor-stats mt-8">
        <div className="surface">
          <strong>{stats?.total ?? "—"}</strong>
          <span>{copy.totalVisits}</span>
        </div>
        <div className="surface">
          <strong>{stats?.located ?? "—"}</strong>
          <span>{copy.located}</span>
        </div>
        <div className="surface">
          <strong>{stats?.unknown ?? "—"}</strong>
          <span>{copy.unknownRegion}</span>
        </div>
      </div>
      {stats && (
        <>
          <div className="surface visitor-chart mt-6">
            <h2 className="font-bold">{copy.visitsByDay}</h2>
            <div className="h-64 mt-3">
              <SimpleChart data={stats.byDay} label={copy.visitsLabel} />
            </div>
          </div>
          <div className="surface mt-6">
            <h2 className="font-bold">{copy.regionalMap}</h2>
            <p className="muted text-sm mt-1">{copy.mapDescription}</p>
            <div aria-label={copy.mapLoading}>
              <LeafletMap points={stats.points} />
            </div>
          </div>
        </>
      )}
      <div className="surface mt-6 overflow-auto">
        <h2 className="font-bold mb-3">{copy.records}</h2>
        <table className="visitor-table">
          <thead>
            <tr>
              <th>{copy.alias}</th>
              <th>{copy.region}</th>
              <th>{copy.time}</th>
              <th>{copy.sourceStatus}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="muted">
                  {copy.noRecords}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.alias + row.createdAt}>
                  <td>{row.alias}</td>
                  <td>
                    {[row.city, row.region, row.country]
                      .filter(Boolean)
                      .join(", ") || copy.unknown}
                  </td>
                  <td>
                    {new Date(row.createdAt).toLocaleString(
                      lang === "vi-VN" ? "vi-VN" : "en-US",
                    )}
                  </td>
                  <td>
                    {row.source} / {row.locationStatus}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex gap-3 mt-4">
          <button
            className="text-link"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            aria-label={copy.previousPage}
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
            aria-label={copy.nextPage}
          >
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SimpleChart({
  data,
  label,
}: {
  data: { date: string; visits: number }[];
  label: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data.slice(-31)}
        margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
      >
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10 }}
          tickFormatter={(value) => String(value).slice(5)}
        />
        <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
        <Tooltip formatter={(value) => [value, label]} />
        <Bar
          dataKey="visits"
          name={label}
          fill="#0f9f8c"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
