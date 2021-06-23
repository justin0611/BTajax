function NhanVien(manv, tennv, chucvu, heso, luongcb, sogiolam) {
    this.manhanvien = manv;
    this.tennhanvien = tennv;
    this.chucvu = chucvu;
    this.heSoChucVu = heso;
    this.luongcoban = luongcb;
    this.soGioLamTrongThang = sogiolam;
    this.tongluong = function () {
        var tong = Number(this.luongcoban) * Number(this.heSoChucVu)
        return tong
    };
    this.xeploai = function () {
        var gio = Number(this.soGioLamTrongThang);
        if (gio > 100) {
            return 'Nhân viên tốt'
        }
        else if (gio > 140) {
            return 'Nhân viên xuất sắc'
        }
        else {
            return 'Nhân viên khá'
        }
    };
}

var kiemTraDuLieu = new Validation();




function setnhanvienmacdinh() {
    document.querySelector("#manhanvien").value = "";
    document.querySelector("#tennhanvien").value = ""
    document.querySelector("#chucvu").value = "1";
    document.querySelector("#luongcb").value = '';
    document.querySelector("#sogiolam").value = '';
}

function getSinhVienApi() {
    //ajax là phương thức bất đồng bộ => trong lúc nó thực thi gửi request đi, thì các tác vụ tiếp theo vẫn làm
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien`, //thông tin backend cung cấp
        method: "GET", //Giao thức backend cung cấp
        responseType: "json", //Kiểu dữ liệu trả về do backend cung cấp
    });

    //Hàm xử lý request thành công
    promise.then(function (result) {
        console.log("1");
        console.log(result.data);
        //Từ dữ liệu backend gửi về viết hàm hiển thị dữ liệu lên table
        renderTableSinhVien(result.data);
    });

    //Hàm xử lý request thất bại
    promise.catch(function (errors) {
        console.log("errors", errors);
    });

    console.log("2");
}
getSinhVienApi();
document.querySelector("#luutt").disabled = true;

function renderTableSinhVien(arrNV) {

    var content = "";
    for (var index = 0; index < arrNV.length; index++) {
        var nv = arrNV[index];
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var nhanvien = new NhanVien(
            nv.maNhanVien,
            nv.tenNhanVien,
            nv.chucVu,
            nv.heSoChucVu,
            nv.luongCoBan,
            nv.soGioLamTrongThang
        );
        //Từ đối tượng sinh viên => tạo ra thẻ tr
        var trNhanVien = `
                          <tr>
                              <td>${nhanvien.manhanvien}</td>
                              <td>${nhanvien.tennhanvien}</td>
                              <td>${nhanvien.chucvu}</td>
                              <td>${nhanvien.luongcoban}</td>
                              <td>${nhanvien.tongluong()}</td>                             
                              <td>${nhanvien.soGioLamTrongThang}</td>
                              <td>${nhanvien.xeploai()}</td>
                              <td>
                              <button class="btn btn-danger" onclick="xoaNhanVien('${nhanvien.manhanvien}')">Xoá
                              </button>
                              </td>
                              <td>
                              <button style="width:100px;" class="btn btn-primary" onclick = "suaThongTin('${nhanvien.manhanvien}')"    >
                              Chỉnh sửa
                              </button>
                              </td>
                          </tr>
          `;
        content += trNhanVien;
    }
    //Dom đến thẻ tblSinhVien chèn chuỗi content vào innerHTML
    document.querySelector("#tblNhanVien").innerHTML = content;
}

document.querySelector("#themnv").onclick = function (event) {
    event.preventDefault(); //Chặn sự kiện reload browser

    var nhanvien = new NhanVien();

    nhanvien.manhanvien = document.querySelector("#manhanvien").value;
    nhanvien.tennhanvien = document.querySelector("#tennhanvien").value;
    nhanvien.heSoChucVu = document.querySelector("#chucvu").value;
    var cv = function () {
        if (nhanvien.heSoChucVu === "1") {
            return 'Nhân viên'
        } else if (nhanvien.heSoChucVu === "2") {
            return 'Quản lý'
        } else { return 'Giám đốc' }
    }
    nhanvien.chucvu = cv();
    nhanvien.luongcoban = document.querySelector("#luongcb").value;
    nhanvien.soGioLamTrongThang = document.querySelector("#sogiolam").value;
    console.log('nhanvien', nhanvien);
    console.log('nhanvien', nhanvien.manhanvien.trim().length);

    // Validation

    // rỗng
    let valid = true;
    valid &= kiemTraDuLieu.kiemTraRong(nhanvien.manhanvien, '#error_required_maNhanvien', 'Mã nhân viên') & kiemTraDuLieu.kiemTraRong(nhanvien.tennhanvien, '#error_required_tenNhanvien', 'Tên nhân viên') & kiemTraDuLieu.kiemTraRong(nhanvien.luongcoban, '#error_required_luongcb', 'Lương cơ bản') & kiemTraDuLieu.kiemTraRong(nhanvien.soGioLamTrongThang, '#error_required_sogiolam', 'Số giờ làm');

    // định dạng số
    valid &= kiemTraDuLieu.kiemTraTatCaSo(nhanvien.manhanvien, '#error_number_maNhanvien', 'Mã nhân viên') & kiemTraDuLieu.kiemTraTatCaSo(nhanvien.luongcoban, '#error_number_luongcb', 'Lương cơ bản') & kiemTraDuLieu.kiemTraTatCaSo(nhanvien.soGioLamTrongThang, '#error_number_sogiolam', 'Số giờ làm');

    // định dạng text
    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanvien.tennhanvien, '#error_text_tenNhanvien', 'Tên nhân viên');

    // Độ dài mã nhân viên
    valid &= kiemTraDuLieu.kiemTraDoDai(nhanvien.manhanvien, '#error_min_max_length_maNhanvien', 4, 6, 'Mã nhân viên')

    // giá trị
    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanvien.luongcoban, '#error_min_max_length_luongcb', 1000000, 20000000, 'Lương cơ bản') & kiemTraDuLieu.kiemTraGiaTri(nhanvien.soGioLamTrongThang, '#error_min_max_length_sogiolam', 50, 150, 'Số giờ làm');


    if (!valid) {
        return;
    }

    setnhanvienmacdinh();

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien`,
        method: "POST",
        data: nhanvien,
    });
    promise.then(function (result) {
        console.log("1");
        console.log(result.data);
        //Từ dữ liệu backend gửi về viết hàm hiển thị dữ liệu lên table
        getSinhVienApi();
    });
    promise.catch(function (errors) {
        console.log("errors", errors);
    });
    document.querySelector("#themnv").disabled = true;
};

function xoaNhanVien(maNV) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNV}`,
        method: "DELETE",
    });

    promise.then(function (result) {
        console.log(result.data);
        //Từ dữ liệu backend gửi về viết hàm hiển thị dữ liệu lên table
        getSinhVienApi();
    });
    promise.catch(function (errors) {
        console.log("errors", errors.response.data);
    });
}
function suaThongTin(maNV) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNV}`,
        method: "GET",
    });
    promise.then(function (result) {
        var Nhanvien = result.data;
        console.log(Nhanvien);
        // load  
        document.querySelector("#manhanvien").value = Nhanvien.maNhanVien;
        document.querySelector("#tennhanvien").value = Nhanvien.tenNhanVien;
        document.querySelector("#chucvu").value = Nhanvien.heSoChucVu;
        document.querySelector("#luongcb").value = Nhanvien.luongCoBan;
        document.querySelector("#sogiolam").value = Nhanvien.soGioLamTrongThang;
    });
    promise.catch(function (errors) {
        console.log("errors", errors.response.data);
    });

    document.querySelector("#luutt").disabled = false;
    document.querySelector("#themnv").disabled = true;
    document.querySelector("#manhanvien").disabled = true;

}

document.querySelector("#luutt").onclick = function (event) {
    event.preventDefault();

    var nhanvien = new NhanVien();

    nhanvien.manhanvien = document.querySelector("#manhanvien").value;
    nhanvien.tennhanvien = document.querySelector("#tennhanvien").value;
    nhanvien.heSoChucVu = document.querySelector("#chucvu").value;
    var cv = function () {
        if (nhanvien.heSoChucVu === "1") {
            return 'Nhân viên'
        } else if (nhanvien.heSoChucVu === "2") {
            return 'Quản lý'
        } else { return 'Giám đốc' }
    }
    nhanvien.chucvu = cv();
    nhanvien.luongcoban = document.querySelector("#luongcb").value;
    nhanvien.soGioLamTrongThang = document.querySelector("#sogiolam").value;
    console.log('nhanvien', nhanvien);


    let valid = true;
    valid &= kiemTraDuLieu.kiemTraRong(nhanvien.tennhanvien, '#error_required_tenNhanvien', 'Tên nhân viên') & kiemTraDuLieu.kiemTraRong(nhanvien.luongcoban, '#error_required_luongcb', 'Lương cơ bản') & kiemTraDuLieu.kiemTraRong(nhanvien.soGioLamTrongThang, '#error_required_sogiolam', 'Số giờ làm');

    // định dạng số
    valid &= kiemTraDuLieu.kiemTraTatCaSo(nhanvien.luongcoban, '#error_number_luongcb', 'Lương cơ bản') & kiemTraDuLieu.kiemTraTatCaSo(nhanvien.soGioLamTrongThang, '#error_number_sogiolam', 'Số giờ làm');

    // định dạng text
    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanvien.tennhanvien, '#error_text_tenNhanvien', 'Tên nhân viên');

    // giá trị
    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanvien.luongcoban, '#error_min_max_length_luongcb', 1000000, 20000000, 'Lương cơ bản') & kiemTraDuLieu.kiemTraGiaTri(nhanvien.soGioLamTrongThang, '#error_min_max_length_sogiolam', 50, 150, 'Số giờ làm');


    if (!valid) {
        return;
    }

    setnhanvienmacdinh();
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanvien.manhanvien}`,
        method: "PUT",
        data: nhanvien,
    });
    promise.then(function (result) {
        console.log(result.data);
        getSinhVienApi();
    });

    promise.catch(function (errors) {
        console.log("errors", errors.response.data);
    });
    document.querySelector("#luutt").disabled = true;
    document.querySelector("#themnv").disabled = false;
    document.querySelector("#manhanvien").disabled = false;
};