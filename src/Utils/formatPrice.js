export function formatPrice(value) {
  if (!value && value !== 0) return "";
  let price=value*1000;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // không có phần thập phân
  }).format(price);
}