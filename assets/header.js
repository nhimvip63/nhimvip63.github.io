


class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
        <div class="grid wide">
            <div class="row" style="justify-content: space-between; background-color: #fff; padding: 30px 0 30px; font-size: 0.75rem; line-height: 20px;">
                <div class="col c-2-4">
                    <div class="footer__title">
                        Khám phá
                    </div>
                    <ul class="footer__items">
                        <li><a href="">Ứng dụng Mobile</a></li>
                        <li><a href="">Viết bình luận</a></li>
                        <li><a href="">Tạo bộ sản phẩm</a></li>
                        <li><a href="">Phần thưởng</a></li>
                        <li><a href="">Bảo mật thông tin</a></li>
                        <li><a href="">Quy định</a></li>
                    </ul>
                </div>
                <div class="col c-2-4">
                    <div class="footer__title">
                        Công ty
                    </div>
                    <ul class="footer__items">
                        <li><a href="">Giới thiệu</a></li>
                        <li><a href="">Trợ giúp</a></li>
                        <li><a href="">Việc làm</a></li>
                        <li><a href="">Nhà đầu tư</a></li>
                        <li><a href="">Góp ý</a></li>
                        <li><a href="">Quy chế</a></li>
                        <li><a href="">Thoả thuận sử dụng dịch vụ</a></li>
                        <li><a href="">Liên hệ</a></li>
                    </ul>
                </div>
                <div class="col c-2-4">
                    <div class="footer__title">
                        Tham gia trên
                    </div>
                    <ul class="footer__items">
                        <li><a href="">Facebook</a></li>
                        <li><a href="">Instagram</a></li>
                        <li><a href="">Youtube</a></li>
                        <li><a href="">Google</a></li>
                        <li><a href="">ShopeeFood.vn</a><span> - Giao đồ ăn tận nơi</span></li>
                        <li><a href="">NowPOS</a><span> - Phần mềm quản lý</span></li>
                    </ul>
                </div>
                <div class="col c-2-4">
                    <div class="footer__title">
                        Giấy phép
                    </div>
                    <ul class="footer__items">
                        <li><a href="">MXH 363/GP-BTTTT</a></li>
                        <li></li>
                    </ul>
                </div>
                <div class="col c-2-4">
                    <span></span>
                </div>
            </div>
        </div>
        <div class=""style="background-color: #eee;">
            <div class="grid wide">
                <div class="bottom__footer">
                    <p>Công Ty Cổ Phần Foody, Lầu G, Tòa nhà Jabes 1, 244 đường Cống Quỳnh, phường Phạm Ngũ Lão, Quận 1, TP.HCM</p>
                    <p>Điện thoại: 1900 2042 Email: support@shopeefood.vn</p>
                    <p>Giấy CN ĐKDN số 0311828036 do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 11/6/2012, sửa đổi lần thứ 23, ngày 10/12/2020</p>
                    <p>Giấy phép thiết lập MXH trên mạng số 363/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 30/6/2016 Người chịu trách nhiệm: Đặng Hoàng Minh.</p>
                </div>
            </div>
        </div>
    </footer>
        `
    }
}

customElements.define('my-footer', MyFooter)