# AK Planner

Ứng dụng cá nhân quản lý công việc, thời gian tập trung và mục tiêu hằng ngày, theo phong cách glassmorphism, tông xanh lá tươi, điểm vàng và đỏ.

## Tính năng

- **Trang chủ**: lời chào theo giờ, 3 thẻ thống kê (việc xong tuần này, thời gian tập trung hôm nay, chuỗi ngày liên tục), thẻ “Mục tiêu hôm nay” với thanh tiến độ, danh sách việc hôm nay.
- **Thêm/sửa công việc**: tên, ngày, giờ (có nút chọn nhanh 7:00/12:00/18:00/21:00), danh mục, **lặp lại** (hằng ngày, T2–T6, hằng tuần, hằng tháng, chọn thứ) và **các bước nhỏ** (checklist). Menu ⋮ để sửa, đưa vào Top 3, dời sang ngày mai, bỏ qua một lần lặp hoặc xóa.
- **Vuốt trên việc**: vuốt phải để hoàn thành, vuốt trái để xóa (việc lặp lại: bỏ qua lần này). Mọi thao tác xóa/dời/hoàn thành đều có nút **Hoàn tác**.
- **Top 3 hôm nay**: chọn 3 việc quan trọng nhất, ghim lên đầu trang chủ. Danh sách việc chia nhóm Quá hạn / Sáng / Chiều / Tối / Trong ngày / Đã xong.
- **Uống nước** (đếm ly theo mục tiêu), **tâm trạng** 5 mức và **nhật ký** một dòng; buổi tối có **Tổng kết ngày** với 3 câu hỏi và tự thêm ưu tiên của ngày mai vào Top 3.
- **Màn chào lần đầu**: hỏi tên, ảnh đại diện, mục tiêu đọc sách và uống nước.
- **Lịch**: xem theo tuần, chấm báo số việc mỗi ngày.
- **Tập trung (Pomodoro)**: bấm thẻ “Tập trung”, chọn 15/25/45/60 phút; vẫn đếm đúng khi chuyển app, có chuông khi hết giờ.
- **Đọc mỗi ngày** (tab Đọc sách): 21 bài đọc ngắn tự biên soạn về phát triển bản thân, kỹ năng, kiến thức và đạo đức. Mỗi bài có châm ngôn, ý chính, việc “Thử ngay hôm nay” và ô ghi chú suy ngẫm. Đồng hồ đọc hướng tới mục tiêu 10 phút/ngày (đổi được), tự tạm dừng khi rời app hoặc 90 giây không thao tác. Có chuỗi ngày đọc, châm ngôn mỗi ngày, lưu bài, chỉnh cỡ chữ và thêm bài đọc của riêng bạn.
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
readings.js           nội dung bài đọc và châm ngôn
sw.js                 service worker (offline)
manifest.webmanifest  thông tin PWA
icons/                biểu tượng app
```
