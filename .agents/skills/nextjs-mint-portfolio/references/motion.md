# Motion và kiểm chứng

## Choreography tham chiếu

| Tương tác | Thông số khởi điểm |
| --- | --- |
| Hero nền | scale1.12→1, 1.8s |
| Hero title | opacity0→1, y28→0, blur12→0,1.1s; stagger150–180ms |
| Eyebrow/body/CTA | fade-up20px,.8s; tổng delay dưới khoảng1s |
| Hero easing | cubic-bezier(.16,1,.3,1) |
| Portrait idle | y[0,-15,0], rotate[-1,1,-1],6s ease-in-out |
| Scroll reveal | y36→0/opacity0→1,.9s,cubic-bezier(.22,1,.36,1),once |
| Toolkit tags | stagger60ms |
| Marquee / asterisk | 30s linear / 7s linear spin |
| Project reveal | y24→0,scale.96→1,opacity0→1,.35s |
| Project image hover | scale1.05,.5s |
| Card spotlight | radial gradient theo CSS variables, accent10–15%; fade khi leave |
| Accordion | height auto/opacity,.4s; plus rotate45deg |
| Scroll indicator | vạch42px, đoạn sáng chạy xuống,2s |
| Progress bar | fixed top,3px,scaleX theo progress |

Các timing là hướng dẫn, không phải lý do trì hoãn hiển thị nội dung. Dùng entrance riêng với hover/layout transforms hoặc tách wrapper. Không sao chép logic preloader của mẫu. Nội dung server-render phải đọc được khi JS chưa chạy hoặc animation lỗi.

Portrait drag là enhancement cho fine pointer, giới hạn trong container, spring trở lại và dừng idle khi kéo. Không chiếm touch scroll. CTA magnetic chỉ nhẹ, không di chuyển vùng bấm quá xa. Custom cursor không cần thiết.

Spotlight: dùng local CSS custom properties/motion values, tránh React setState mỗi frame trên toàn trang. Có thể thêm ít particle bằng canvas nếu thực sự cải thiện hero; không mặc định đưa thư viện 3D vào bundle. Cleanup RAF, listener, observer, timer. Pause animation nặng khi ngoài viewport hoặc document hidden.

Reduced motion: bỏ blur/parallax/drag decoration/loop; nội dung opacity1 và transform none. Các animated marquee cần control pause và bản tĩnh dễ đọc. Dùng semantic link/button, focus-visible và trạng thái pressed. Dropdown/dialog quản lý focus phù hợp và Escape; không trap focus ở menu thường nếu không phải modal.

## Kiểm chứng theo rủi ro thực tế

- Chạy scripts dự án: lint/typecheck/build và test liên quan đến logic bị sửa. Không thêm test chỉ kiểm tra class CSS giống implementation.
- Nếu có browser, kiểm tra375,768,1024,1440px: không overflow/chồng chữ, dấu tiếng Việt đầy đủ, header không che anchor, CTA có thể dùng và contrast đúng cả theme.
- Xem chuyển động thật: first load, scroll, hover/focus, filter, mobile menu, reduced motion. Screenshot chỉ xác nhận bố cục.
- Kiểm tra route, locale/theme switcher, form và data flow bị ảnh hưởng; phân biệt lỗi trước đó với lỗi mới.
- Kiểm tra console/hydration/ảnh/link hỏng. Đừng ẩn overflow toàn trang để che lỗi layout chưa hiểu.
- Tự chỉnh các lỗi thị giác quan sát được. Nếu không có browser, báo chưa kiểm tra trực quan; không khẳng định pixel-perfect hoặc điểm hiệu suất chưa đo.
- Bàn giao ngắn: thay đổi, thư viện/lý do, kết quả kiểm tra, giới hạn và preview/run command. Không tự deploy.
