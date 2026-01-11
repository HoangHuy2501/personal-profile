const openAppOrWeb = (appUrl, webUrl) => {
  const start = Date.now();
  window.location.href = appUrl;

  setTimeout(() => {
    if (Date.now() - start < 2000) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
    }
  }, 1500);
};

export default openAppOrWeb;