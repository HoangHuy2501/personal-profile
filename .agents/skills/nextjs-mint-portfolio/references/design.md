# Đặc tả giao diện

## Token và nhịp bố cục

Các giá trị tham chiếu từ mã mẫu, được phép điều chỉnh để phù hợp nội dung:

| Thành phần | Giá trị |
| --- | --- |
| Background / surface | #0d1116 / #14181f |
| Accent / accent dark | #00df8f / #00b373 |
| Text / muted | #ffffff / #9ca3af |
| Border | rgba(255,255,255,.10) |
| Display font | Space Grotesk, Be Vietnam Pro, sans-serif |
| Body font | Be Vietnam Pro, sans-serif |
| Container | max-width 1274px, centered |
| Gutter | clamp(20px,4vw,40px) |
| Section padding | 96px; desktop 128px |
| Card radius | 24–32px |
| Outline heading | transparent fill, mint stroke 2px; mobile 1px nếu cần |
| Background grid | 40px squares, white 5% |

Body 16–18px, line-height 1.6; heading tracking âm nhẹ, line-height .95–1.05 nhưng không cắt dấu. Dùng clamp, không ép tiêu đề tiếng Việt theo line-break tiếng Anh. Pill cho nút/tag, border mảnh và shadow mềm; tránh phủ glass/glow lên mọi section.

## Header

Fixed cách trên 16px, gutter ngoài 16px. Pill tối đa 1274px, nền black/55, blur 12–16px, border white/10. Avatar tròn 36px + tên bên trái; nav, divider và social bên phải. Giữ locale/theme switcher. Chỉ hiển thị chấm trạng thái nếu dữ liệu phù hợp. Nav underline mở từ trái trong 300ms; avatar hover rotate nhẹ; social hover translate-y -2px/rotate 6deg. Chuyển menu mobile khi hết chỗ (mẫu khoảng 860px). Panel dưới header, nền tối gần đặc, radius 24px; vùng chạm ít nhất khoảng 44px.

## Hero

Min-height gần 100svh, top padding 128px, bottom 64px; cho phép tăng theo nội dung. Desktop 2 cột gap 64px, mobile text trước portrait sau.

Trái: eyebrow uppercase tracking .25em và chấm accent; H1 clamp(40px,7vw,88px), bold, kết hợp một dòng trắng đặc với một đoạn outline mint và dấu nhấn mint. Lấy thông điệp từ dữ liệu hiện tại. Mô tả max-width 448px. Hai CTA pill: primary mint gradient với chữ tối, secondary surface/border white20. Padding khoảng 24px × 14px.

Phải: container cao 420px mobile, 480–560px desktop. Thẻ ảnh rộng 260px mobile/300px desktop, padding12, radius28, border white15, shadow sâu. Ảnh 3:4, radius20, object-fit cover; gradient đen ở đáy cho tên/vai trò. Có thể thêm dây treo mờ bằng CSS phía trên. Nếu không có chân dung, dùng monogram hoặc asset thật, không lấy ảnh của mẫu.

Nền: grid mờ; từ trang trí lớn khoảng20vw, độ tương phản thấp, aria-hidden; spotlight mint theo pointer. Có thể dùng gradient động nhẹ thay video nếu không có video hợp lệ trong dự án. Không tải video của mẫu. Indicator cuộn chỉ đặt ở nơi không đè nội dung.

## Marquee

Ngay sau hero: nền trắng/chữ tối, padding dọc16–26px. Dùng công nghệ/năng lực thật, phân tách bằng asterisk xoay. Track seamless; bản lặp aria-hidden và không có phần tử focusable. Có nút pause nếu chuyển động liên tục, hover/focus cũng pause. Reduced motion hiển thị tĩnh, không mất nội dung.

## About và toolkit

Hai cột desktop: giới thiệu và năng lực từ dữ liệu thật; mobile một cột. Heading clamp(40px,8vw,80px), mô tả max-width512px. Hàng số liệu chỉ khi có số thật. Toolkit phía dưới radius24, white5, border mảnh, padding32; tag pill wrap. Giữ phân nhóm frontend/backend/database/kỹ năng khác đang có. Không thay bằng một danh sách ngắn làm mất nội dung.

## Projects

Eyebrow nhỏ, H2 clamp(40px,7vw,76px), mô tả max-width672px. Filter pill chỉ nếu category thật; active mint/chữ tối, count tính từ data.

Desktop grid12 cột: featured span6, thường span4 tùy số lượng; tablet2 cột/mobile1. Gap24–32. Card radius26–32, padding24–32, border white12, nền tối phân lớp. Header badge và arrow button; ảnh16:9 radius16; title24–30; mô tả ngắn, technology tags, CTA/link thật. Không tạo demo/trailer giả. Giữ route chi tiết hiện có thay vì đổi toàn bộ sang modal.

## Section có điều kiện

- Quy trình/năng lực có nội dung dài: accordion max-width896px, heading chữ đặc + outline, hàng số thứ tự/title/plus mint, border-bottom. Không bịa quy trình nếu không có dữ liệu.
- Ảnh đời sống có sẵn: desktop thẻ3:4 xếp chồng rồi xòe; góc -9,-3,3,9 độ cho bốn ảnh. Tính theo số ảnh thực tế. Mobile dùng grid hoặc scroll-snap không tràn trang.

## CTA và footer

CTA căn giữa, chữ đặc + outline, font clamp(44px,9vw,120px), thông điệp đúng locale và dữ liệu. Glow nền tiết chế.
Footer border-top, top padding80px, desktop trái là lời liên hệ/email thật, phải menu/social. Email có thể là pill trắng chữ tối. Từ nền lớn25vw/opacity5%, aria-hidden. Copyright thật và back-to-top. Không sao chép liên kết pháp lý hay thông tin của mẫu.
