---
name: nextjs-mint-portfolio
description: Thiết kế và chỉnh sửa portfolio Next.js phong cách nền tối xanh mint giống nguyenhoanghuy.shop, với typography lớn, ảnh nổi, marquee, spotlight card và animation. Dùng khi người dùng yêu cầu phong cách này hoặc gọi skill để làm frontend portfolio; bảo toàn kiến trúc và dữ liệu dự án hiện tại.
---

# Next.js Mint Portfolio

Triển khai giao diện thực tế dựa trên repository hiện tại. Đọc [đặc tả thiết kế](references/design.md) trước khi sửa giao diện; đọc [chuyển động và kiểm chứng](references/motion.md) khi triển khai tương tác.

Không cần truy cập website mẫu. Đặc tả được tổng hợp từ HTML/CSS/JavaScript công khai của nguyenhoanghuy.shop trong cuộc trò chuyện, không phải bản đối chiếu screenshot. Không tuyên bố giống từng pixel. Yêu cầu mới của người dùng được ưu tiên hơn các mặc định thiết kế dưới đây.

## Khảo sát và phạm vi

- Đọc AGENTS.md, README, package.json; xác định router, styling, nguồn dữ liệu, i18n, theme và dependencies. Tóm tắt hướng làm rồi triển khai.
- Sửa ứng dụng hiện tại, mặc định tập trung trang home và thành phần dùng chung cần thiết. Không dựng project song song hoặc đổi router/phiên bản Next.js chỉ để làm giao diện.
- Giữ route, API, CMS, xác thực, form, metadata, dữ liệu động, bản dịch và liên kết. Không biến dữ liệu động thành hardcode.
- Ánh xạ các section trong đặc tả sang nội dung thật. Bỏ section không có dữ liệu; không bịa thành tích, số liệu, ảnh, testimonial hoặc chức năng.
- Không đổi định vị cá nhân/doanh nghiệp theo mẫu. Nếu dự án chưa phải Next.js, trình bày ranh giới chuyển đổi và chỉ chuyển khi thuộc phạm vi được giao.

## Quyết định thiết kế

Dùng nền graphite, mint accent, chữ display lớn có đoạn outline, navbar pill, khoảng trắng rộng và chân dung nổi để tạo bản sắc. Màu tối đơn thuần hoặc một lưới card chung chung chưa đáp ứng yêu cầu. Chọn phân cấp chữ và bố cục trước khi thêm hiệu ứng. Điều chỉnh xuống dòng cho từng ngôn ngữ, giữ dấu tiếng Việt không bị cắt.

Dùng font, ảnh và icon sẵn có nếu phù hợp. Nếu thiếu video/ảnh mẫu, dùng CSS hoặc asset thật trong dự án; thiếu asset trang trí không phải lý do dừng. Giữ theme hiện tại, ánh xạ token cho light mode nếu có.

## Triển khai

- Tái sử dụng component và quy ước hiện có. Với App Router, giữ nội dung/lấy dữ liệu ở Server Components, tách phần tương tác thành Client Components nhỏ.
- Dùng CSS cho hover/grid/glow/marquee; ưu tiên thư viện animation đang có hoặc Motion cho reveal, drag và layout transitions.
- Có thể phối hợp nhiều thư viện có chức năng khác nhau: Lucide cho icon, Radix cho primitive accessible, Embla khi thực sự cần carousel. GSAP chỉ cho timeline phức tạp có lý do; thiết kế này không đòi hỏi 3D.
- Không để hai thư viện điều khiển cùng transform. Kiểm tra tương thích và bundle impact trước khi thêm dependency; dùng package manager/lockfile hiện tại.
- Không đặt use client lên toàn trang vì animation; không tạo hydration mismatch bằng window, random hoặc thời gian trong server render.
- Giữ vùng click ổn định, không lồng các phần tử interactive trong nhau. Spotlight không được che link hay focus ring.
- Không đưa secret hoặc mã server vào client. Không sửa backend/schema vì mục đích thẩm mỹ.

## Hoàn thành

Thực hiện kiểm chứng theo references/motion.md. Báo cáo phần đã thay đổi, dependency mới và mục đích, kiểm tra đã chạy, giới hạn còn lại và cách xem thử. Không tự deploy production. Không xem build thành công là bằng chứng chất lượng thị giác; khi có browser, quan sát và sửa sai lệch cụ thể.
