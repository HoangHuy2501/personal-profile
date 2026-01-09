const fmtDate = (iso) => {
  if(!iso) return { date: "đợi", time: "" };
  const d = new Date(iso);

  const date = d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const time = d.toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, time };
};

export default fmtDate;
