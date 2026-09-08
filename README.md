# Nguyen Hoang Huy - Portfolio

Portfolio cá nhân của Nguyen Hoang Huy, xây dựng bằng Next.js App Router và React. Website giới thiệu năng lực full-stack, dự án, thông tin cá nhân và kênh liên hệ; hỗ trợ tiếng Việt/tiếng Anh, giao diện sáng/tối và nền bong bóng 3D tương tác.

## Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ](#công-nghệ)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt và chạy local](#cài-đặt-và-chạy-local)
- [Các script](#các-script)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Route và đa ngôn ngữ](#route-và-đa-ngôn-ngữ)
- [Theme và nền 3D](#theme-và-nền-3d)
- [Tối ưu hiệu suất](#tối-ưu-hiệu-suất)
- [Biến môi trường](#biến-môi-trường)
- [Build và triển khai](#build-và-triển-khai)
- [Xử lý sự cố](#xử-lý-sự-cố)

## Tính năng

- Trang portfolio gồm Home, About, Project và Contact.
- Điều hướng responsive: navbar desktop và menu mobile có animation.
- Hỗ trợ `vi` và `en`, nội dung được quản lý trong `src/locales`.
- Chuyển light/dark bằng `ThemeProvider`, lưu lựa chọn ở local storage.
- Nền bong bóng 3D toàn màn hình bằng Three.js:
  - Bong bóng nền đa sắc, trong mờ, có highlight, clearcoat và iridescence.
  - Chuyển động chậm với quỹ đạo, tốc độ, kích thước và chiều sâu khác nhau.
  - Desktop sinh bong bóng nhỏ tại vị trí chuột; bong bóng bay lên và tan trong khoảng 1-2 giây.
  - Object pool giới hạn tổng số phần tử; không tạo React state trong vòng lặp render.
  - Canvas fixed, `pointer-events: none`, không che CTA, link hoặc thao tác cuộn.
- Hiệu ứng reveal, marquee, progress bar cuộn và các card tương tác.
- Fallback CSS khi WebGL không khả dụng hoặc người dùng bật reduced motion.
- Metadata, sitemap, robots và favicon cho ứng dụng Next.js.

## Công nghệ

Các phiên bản dưới đây là dependency đang có trong `package.json`; không cần nâng cấp framework để chạy hiệu ứng 3D.

| Nhóm | Công nghệ |
| --- | --- |
| Framework | Next.js `15.5.9` (App Router) |
| UI runtime | React `19.1.1`, React DOM `19.1.1` |
| 3D | `three` `0.185.1`, `@react-three/fiber` `9.7.0`, `@react-three/drei` `10.7.8` |
| Ngôn ngữ | TypeScript `5.9.3` |
| CSS | Tailwind CSS `3.4.15`, CSS module/global styles |
| UI và icon | Ant Design, Radix Slot, Lucide, React Icons |
| Animation | `motion` |
| HTTP và dữ liệu | Axios, TanStack React Query |
| Tooling | ESLint 9, PostCSS, Node.js 22 |

## Yêu cầu hệ thống

- Node.js `22.12.0` (xem trường `engines` trong `package.json`).
- npm đi kèm Node.js.
- Trình duyệt hiện đại có JavaScript; WebGL là tùy chọn vì app có CSS fallback.

## Cài đặt và chạy local

### Feedback và thống kê khu vực

Tính năng mới dùng Prisma/PostgreSQL (Neon). Sao chép `.env.example` thành `.env.local`, điền `DATABASE_URL` (pooled runtime), `DATABASE_URL_UNPOOLED` (direct migration), hai bcrypt hash quản trị và `RATE_LIMIT_SECRET`. Tạo hash bằng `npm run password:hash` (mật khẩu được nhập ẩn, không truyền qua CLI). Không đặt hash dưới tiền tố `NEXT_PUBLIC_`.

Chạy `npm run prisma:generate`, tạo migration trên database phát triển bằng `npx prisma migrate dev --name feedback_visitors`, sau đó áp dụng migration đã review bằng `npm run prisma:migrate`. Không chạy migrate/reset trong preview build và không dùng production database cho test.

`VISITOR_TRACKING_ENABLED` giữ cả UI consent và server tracking tắt mặc định; chỉ bật sau khi thông báo/consent phù hợp. Dữ liệu vị trí là ước lượng theo geolocation của Vercel (không GPS, không lưu IP thô), retention mặc định 30 ngày. Chạy `npm run retention:cleanup` theo cron/scheduler riêng; script không tự schedule.

Dashboard nằm tại `/vi/visitor-map` hoặc `/en/visitor-map`, cần mật khẩu location riêng. Feedback ở trang Contact; reply yêu cầu mật khẩu feedback mỗi lần. Visitor visit là lượt mở tab, không phải số người duy nhất. Khi thiếu geolocation, bản ghi vẫn lưu với `unknown` và không tạo điểm 0,0.

```bash
git clone <repository-url>
cd frontend
npm ci
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Có thể kiểm tra trực tiếp các URL `/vi`, `/en`, `/vi/about`, `/en/project` hoặc `/vi/contact`.

Nếu không dùng lockfile, thay `npm ci` bằng `npm install`. Không commit thư mục `node_modules` hoặc file chứa secret.

## Các script

| Lệnh | Mục đích |
| --- | --- |
| `npm run dev` | Chạy Next.js development server với hot reload. |
| `npm run build` | Compile, type-check và tạo production build. |
| `npm run start` | Chạy production server sau khi build. |
| `npm run lint` | Kiểm tra ESLint trên toàn repository. |
| `npm run preview` | Alias hiện tại của `next dev` để tương thích workflow cũ. |

Quy trình kiểm tra trước khi tạo PR:

```bash
npm run lint
npm run build
```

## Cấu trúc dự án

```text
src/
├── app/
│   ├── layout.tsx                 # Root layout, metadata và Providers
│   ├── page.tsx                   # Entry route `/`
│   ├── Providers.tsx              # Language, theme, AntD, header, background
│   ├── globals.css                # Import CSS toàn cục
│   ├── [locale]/                  # Route locale `en` hoặc `vi`
│   │   ├── page.tsx               # Trang home theo locale
│   │   ├── layout.tsx             # Đồng bộ locale và modal slot
│   │   └── (public)/              # about, contact, home, project
│   └── @modal/default.tsx         # Parallel route mặc định
├── components/                    # UI và scene dùng chung
│   ├── TechBackground.tsx         # Canvas bong bóng Three.js
│   ├── Header.tsx                 # Navigation responsive
│   └── ...
├── hook/                          # Theme, language, reveal, AntD wrapper
├── locales/                       # Nội dung vi/en theo domain
├── lib/                           # Locale helpers và data mapping
├── page/                          # Page sections Home/About/Project/Contact
├── assets/                        # Ảnh và SVG tĩnh được import qua bundler
└── Utils/                         # Tiện ích lưu theme/ngôn ngữ, format và auth
public/                            # File tĩnh phục vụ trực tiếp
```

Giữ dữ liệu nội dung trong `src/locales` và các module `src/lib`; không hardcode lại dữ liệu trong component trình bày nếu không cần thiết.

## Route và đa ngôn ngữ

Locale hợp lệ là `en` và `vi`, được khai báo trong `src/lib/locale.ts` và generate tĩnh tại `src/app/[locale]/page.tsx`.

| URL | Nội dung |
| --- | --- |
| `/` | Home mặc định |
| `/en`, `/vi` | Home theo ngôn ngữ |
| `/en/home`, `/vi/home` | Home route tường minh |
| `/en/about`, `/vi/about` | Giới thiệu |
| `/en/project`, `/vi/project` | Dự án |
| `/en/contact`, `/vi/contact` | Liên hệ |

Header dùng `localizedPath()` để giữ locale khi chuyển trang. `LanguageProvider` đồng bộ lựa chọn với local storage và cập nhật `document.documentElement.lang` (`en`/`vi`). Khi thêm bản dịch, cập nhật đồng thời các namespace tương ứng trong `src/locales/en` và `src/locales/vi`.

## Theme và nền 3D

`ThemeProvider` cung cấp `dark` và `setDark` qua `useLightDark()`. `AntdThemeWrapper` ánh xạ theme cho component Ant Design; CSS dùng class `.dark` trên phần tử `html`.

`TechBackground` được tải bằng `next/dynamic` với `ssr: false`, vì vậy nội dung và CTA không phải chờ WebGL. Scene dùng:

- `InstancedMesh` và một `SphereGeometry` dùng chung cho bóng nền/bóng con trỏ.
- `MeshPhysicalMaterial` cho bóng lớn; shader nhẹ cho bóng nhỏ.
- `useFrame`, `ref` và uniform/instance attributes thay vì `setState` mỗi frame.
- `frameloop="never"` khi tab bị ẩn, scene không giao nhau viewport hoặc bật `prefers-reduced-motion`.
- CSS fallback `.tech-background-fallback` với nền `#0d1116` (dark) hoặc `#f5faf8` (light).

Khi chỉnh scene, giữ `z-index: 0`, `pointer-events: none` và đảm bảo `main`, footer, header có stacking context cao hơn.

## Tối ưu hiệu suất

- Giới hạn số bóng và pixel ratio trên mobile.
- Không bật vệt chuột trên thiết bị cảm ứng.
- Pointer listener dùng passive event và throttle; pool tái sử dụng slot đã hết vòng đời.
- Vật liệu khúc xạ/transmission chỉ dùng ở mức nhẹ, không tạo material riêng cho từng bóng.
- Geometry được dispose khi component unmount hoặc thay đổi cấu hình.
- Animation dừng khi tab ẩn và tắt chuyển động khi hệ điều hành yêu cầu reduced motion.
- Nếu cần kiểm tra GPU, dùng Chrome DevTools Performance/Rendering và theo dõi draw calls, memory, FPS trên cả desktop và mobile.

## Biến môi trường

Tạo `.env.local` cho biến môi trường local. Không đưa giá trị bí mật vào client component hoặc commit file `.env` thật.

```dotenv
# Ví dụ biến public nếu cần dùng ở browser
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Tên biến thực tế phụ thuộc API/backend được cấu hình trong môi trường triển khai. Nếu thêm biến server-only, không đặt tiền tố `NEXT_PUBLIC_`.

## Build và triển khai

Build production:

```bash
npm ci
npm run lint
npm run build
npm run start
```

Có thể triển khai trên Vercel hoặc bất kỳ nền tảng Node.js hỗ trợ Next.js 15. Thiết lập Node `22.12.0`, copy các biến môi trường cần thiết và dùng lệnh build mặc định `npm run build`. Kiểm tra WebGL fallback trên thiết bị/đầu trình duyệt không hỗ trợ WebGL trước khi phát hành.

## Xử lý sự cố

### Canvas không hiển thị

Kiểm tra WebGL trong trình duyệt, GPU acceleration và console. Ứng dụng sẽ chủ động hiển thị nền CSS nếu WebGL không khả dụng; đây là hành vi bình thường.

### Nền che nội dung hoặc không bấm được nút

Đảm bảo phần tử nền giữ `pointer-events: none`, còn nội dung có `position: relative` và `z-index` cao hơn. Không đặt Canvas vào trong vùng CTA interactive.

### Theme không đổi màu

Dùng component bên trong `ThemeProvider`, gọi `useLightDark()`, và kiểm tra class `dark` trên `document.documentElement`. Tránh CSS `filter: invert()`.

### Lỗi hydration

Không đọc `window`, random hoặc thời gian trong Server Component. Các logic browser/Three.js phải nằm trong Client Component hoặc `useEffect`; `TechBackground` đã được dynamic import với `ssr: false`.

### Build hoặc type-check lỗi

Xóa `.next` khi cache cũ gây nhiễu, chạy lại `npm ci`, sau đó thử `npm run lint` và `npm run build`. Giữ đúng Node version được khai báo trong `package.json`.

## Ghi chú phát triển

- Giữ nguyên route, dữ liệu, i18n và hành vi CTA khi chỉnh giao diện.
- Ưu tiên component nhỏ, dữ liệu có type và CSS token hiện có.
- Không thêm physics engine cho hiệu ứng bong bóng vì không có nhu cầu va chạm thực tế.
- Khi thay đổi dependency, cập nhật cả `package.json` và `package-lock.json`, đồng thời xác nhận tính tương thích với React/Next.js hiện tại.
