# AK Planner

Ứng dụng cá nhân quản lý công việc, thời gian tập trung và mục tiêu hằng ngày, theo phong cách glassmorphism, màu chủ đạo xanh lá tươi, bộ biểu tượng ngày lễ vẽ riêng (hoa mai, sao, đèn lồng, hoa sen…).

## Tính năng

- **Trang chủ**: lời chào theo giờ, 3 thẻ thống kê (việc xong tuần này, thời gian tập trung hôm nay, chuỗi ngày liên tục), thẻ “Mục tiêu hôm nay” với thanh tiến độ, danh sách việc hôm nay.
- **Thêm/sửa công việc**: tên, ngày, giờ (có nút chọn nhanh 7:00/12:00/18:00/21:00), danh mục, **lặp lại** (hằng ngày, T2–T6, hằng tuần, hằng tháng, chọn thứ) và **các bước nhỏ** (checklist). Menu ⋮ để sửa, đưa vào Top 3, dời sang ngày mai, bỏ qua một lần lặp hoặc xóa.
- **Vuốt trên việc**: vuốt phải để hoàn thành, vuốt trái để xóa (việc lặp lại: bỏ qua lần này). Mọi thao tác xóa/dời/hoàn thành đều có nút **Hoàn tác**.
- **Dời việc chưa xong sang ngày mai**: bấm “Dời sang mai” ở mục Việc của tôi, chọn việc muốn dời (gồm cả việc quá hạn), giữ nguyên giờ và chỗ trong Top 3, có Hoàn tác. Có thể bật **tự chuyển việc chưa xong sang hôm sau** trong trang Cá nhân.
- **Top 3 hôm nay**: chọn 3 việc quan trọng nhất, ghim lên đầu trang chủ. Danh sách việc chia nhóm Quá hạn / Sáng / Chiều / Tối / Trong ngày / Đã xong.
- **Uống nước** (đếm ly theo mục tiêu), **tâm trạng** 5 mức và **nhật ký** một dòng; buổi tối có **Tổng kết ngày** với 3 câu hỏi và tự thêm ưu tiên của ngày mai vào Top 3.
- **Màn chào lần đầu**: hỏi tên, ảnh đại diện, thói quen muốn rèn và mục tiêu đọc sách, uống nước.
- **Màn chào mỗi ngày**: lần đầu mở app trong ngày hiện ngày dương/âm, ngày lễ, châm ngôn, tóm tắt “Hôm nay của bạn” (thư đến hạn, ngày quan trọng, ca trực, việc, thói quen, đọc sách), kết quả hôm qua và chọn tâm trạng.
- **Chiến tích hôm nay** (kiểu Locket): chụp hoặc chọn ảnh khoảnh khắc đáng tự hào, thêm chú thích; khung ảnh lớn trên trang chủ (vuốt ngang để xem các ảnh trong ngày, chú thích nền kính trong), lịch ảnh theo tháng, chuỗi ngày, xem toàn màn hình, chia sẻ. Ảnh lưu trong IndexedDB của thiết bị.
- **Thư gửi bản thân tương lai**: viết thư, chọn mở sau 1/3/6/12 tháng hoặc ngày tùy chọn; thư được niêm phong đến đúng ngày, khi đến hạn app báo trên trang chủ và màn chào.
- **Tab Tiện ích** gom các công cụ dưới đây cùng Thống kê, Nhật ký và Cá nhân. Nút **+** thêm theo ngữ cảnh trang đang mở; **giữ nút +** để mở menu thêm nhanh.
- **Thói quen**: chọn biểu tượng, màu, các ngày trong tuần, số lần mỗi ngày; chạm để đánh dấu trên trang chủ; chuỗi ngày liên tục, tỉ lệ 30 ngày, lịch 7 ngày.
- **Lịch âm**: ngày âm trên từng ô lịch, can chi ngày/tháng/năm, lịch tháng, mùng 1 và rằm tới, ngày lễ dương lịch và âm lịch sắp tới (tính theo giờ Việt Nam, thuật toán thiên văn của Hồ Ngọc Đức).
- **Ngày quan trọng**: sinh nhật, kỷ niệm, ngày giỗ, hạn chót; theo dương lịch hoặc âm lịch, lặp hằng năm, đếm ngược, tự tính số tuổi; hiện trên trang chủ khi còn ≤ 7 ngày.
- **Thu chi**: ghi khoản chi/thu với nút số tiền nhanh, 10 nhóm chi tiêu, ngân sách tháng có cảnh báo, tổng hợp theo nhóm và theo ngày.
- **Lịch trực theo tuần** (lịch công bố mỗi Chủ nhật): có sẵn 2 vị trí “Trực lễ tân, cửa giám sát” (6 ca) và “Trực NOC” (7 ca) cùng giờ từng ca; ngày trực tính từ 7h30. Mỗi tuần chỉ cần chạm vào bảng ngày × ca để đánh dấu ca mình trực. Có tổng số ca, giờ trực, ca đêm; ghi chú, đổi ca và đánh dấu đã báo cáo Ban Giám đốc; việc cần làm trong ca; danh bạ liên hệ; nhắc nhập lịch vào Chủ nhật; xuất file `.ics` để Lịch điện thoại nhắc trước 30 phút. Ca trực hiện trên trang chủ, trong Lịch và thông báo.
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
lunar.js              chuyển đổi âm lịch, can chi, ngày lễ
sw.js                 service worker (offline)
manifest.webmanifest  thông tin PWA
icons/                biểu tượng app
```
