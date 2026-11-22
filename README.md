# AK Planner

Ứng dụng cá nhân quản lý công việc, thời gian tập trung và mục tiêu hằng ngày, theo phong cách glassmorphism, tông xanh ô-liu ngành công an điểm vàng và đỏ.

## Tính năng

- **Trang chủ**: lời chào theo giờ, 3 thẻ thống kê (việc xong tuần này, thời gian tập trung hôm nay, chuỗi ngày liên tục), thẻ “Mục tiêu hôm nay” với thanh tiến độ, danh sách việc hôm nay.
- **Thêm/sửa công việc**: tên, ngày, giờ, danh mục (Công việc, Sức khỏe, Học tập, Cá nhân); menu ⋮ để sửa, dời sang ngày mai, xóa.
- **Lịch**: xem theo tuần, chấm báo số việc mỗi ngày.
- **Tập trung (Pomodoro)**: bấm thẻ “Tập trung”, chọn 15/25/45/60 phút; vẫn đếm đúng khi chuyển app, có chuông khi hết giờ.
- **Thống kê**: tỉ lệ hoàn thành 7 ngày, biểu đồ việc xong và phút tập trung, chuỗi dài nhất, theo danh mục.
- **Cá nhân**: đổi tên, lời nhắn, ảnh đại diện (emoji hoặc ảnh từ máy), giao diện Sáng/Tối/Theo hệ thống, sao lưu và khôi phục dữ liệu (JSON).
- **Tìm kiếm** (có dấu hoặc không dấu) và **thông báo** việc sắp tới hoặc quá hạn.
- **PWA**: cài lên màn hình chính và dùng offline.

Dữ liệu lưu trong `localStorage` trên chính thiết bị, không gửi đi đâu. Nên thỉnh thoảng dùng “Sao lưu dữ liệu”.

## Chạy thử

Không cần cài đặt gì, chỉ cần một web server tĩnh:

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Dùng trên điện thoại

Đăng lên GitHub Pages (Settings → Pages → Deploy from branch), mở link bằng Safari/Chrome rồi chọn **Thêm vào màn hình chính**.

## Cấu trúc

```
index.html            khung trang
styles.css            giao diện (token màu, sáng/tối)
app.js                toàn bộ logic
sw.js                 service worker (offline)
manifest.webmanifest  thông tin PWA
icons/                biểu tượng app
```
