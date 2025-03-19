// ----------------Initialize variables-----------------------
const sideMenuBtn = document.querySelectorAll(".offcanvas-body .table-cate ul li");
const tableHeading = document.querySelector(".table-container .table-heading");
const showSideMenuBtn = document.getElementById("showSideMenuBtn");
const sideMenu = new bootstrap.Offcanvas(document.getElementById("offcanvasScrolling"));

// ------------------Function--------------------------
function chuyenTrang(nameTmp) {
    tableHeading.textContent = nameTmp;
    sideMenu.hide(); // Dùng API của Bootstrap để đóng menu đúng cách
}

// ----------------Adding Events-----------------------
for (let i = 0; i < sideMenuBtn.length; i++) {
    sideMenuBtn[i].addEventListener("click", function () {
        chuyenTrang(sideMenuBtn[i].textContent);
    });
}

// ----------------Thêm xử lý tải dữ liệu từ server-----------------------
window.onload = function () {
    fetchData("Khách hàng");
};

async function fetchData(tableName) {
    let url = "";
    if (tableName === "Nhân viên") {
        url = "http://localhost:3333/students/allNhanVien";
    } else if (tableName === "Khách hàng") {
        url = "http://localhost:3333/students/allStudents";
    } else if (tableName === "Phòng") {
        url = "http://localhost:3333/students/allPhong";
    } else if (tableName === "Hóa đơn") {
        url = "http://localhost:3333/students/allHoaDon";
    } else if (tableName === "Phục vụ") {
        url = "http://localhost:3333/students/allPhucVu";
    }

    if (url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Dữ liệu từ API:", data); // Debug

            const tableBody = document.getElementById("data-table");
            tableBody.innerHTML = ""; // Xóa dữ liệu cũ
            let tableHeader = "";

            if (tableName === "Nhân viên" || tableName === "Khách hàng") {
                tableHeader = `
                    <tr>
                        <th>ID</th>
                        <th>Họ Tên</th>
                        <th>CCCD</th>
                        <th>Tuổi</th>
                        <th>Giới Tính</th>
                        <th>Số Điện Thoại</th>
                    </tr>`;
                data.forEach((item) => {
                    const row = `<tr>
                        <td>${item.id_nhanVien || item.id_khachHang || "N/A"}</td>
                        <td>${item.hoTen || "N/A"}</td>
                        <td>${item.cccd || "N/A"}</td>
                        <td>${item.tuoi !== undefined ? item.tuoi : "Chưa có dữ liệu"}</td>  
                        <td>${item.gioiTinh || "N/A"}</td>
                        <td>${item.sdt || "N/A"}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            } else if (tableName === "Phòng") {
                tableHeader = `
                    <tr>
                        <th>Số Phòng</th>
                        <th>Loại Phòng</th>
                        <th>Giá Phòng</th>
                    </tr>`;
                data.forEach((item) => {
                    const row = `<tr>
                        <td>${item.so_phong || "N/A"}</td>
                        <td>${item.loai_phong || "N/A"}</td>
                        <td>${item.gia_phong || "N/A"}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            } else if (tableName === "Hóa đơn") {
                tableHeader = `
                    <tr>
                        <th>Mã Hóa Đơn</th>
                        <th>Mã Khách hàng</th>
                        <th>Số phòng</th>
                        <th>Tổng tiền</th>
                    </tr>`;
                data.forEach((item) => {
                    const row = `<tr>
                        <td>${item.id_hoaDon || "N/A"}</td>
                        <td>${item.id_khachHang || "N/A"}</td>
                        <td>${item.so_phong|| "N/A"}</td>
                        <td>${item.giaTien || "N/A"}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            } else if (tableName === "Phục vụ") {
                tableHeader = `
                    <tr>
                        <th>ID Nhân Viên</th>
                        <th>ID Khách hàng</th>
                    </tr>`;
                data.forEach((item) => {
                    const row = `<tr>
                        <td>${item.id_nhanVien || "N/A"}</td>
                        <td>${item.id_khachHang || "N/A"}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            }

            // Cập nhật header bảng
            document.querySelector(".table-content thead").innerHTML = tableHeader;

        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    }
}



// ----------------Chỉnh sửa sự kiện click cho menu-----------------------
for (let i = 0; i < sideMenuBtn.length; i++) {
    sideMenuBtn[i].addEventListener("click", function () {
        const tableName = sideMenuBtn[i].textContent.trim();
        chuyenTrang(tableName);
        fetchData(tableName); // Gọi API lấy dữ liệu tương ứng
    });
}

// ----------------Thanh tìm kiếm----------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const searchInputs = document.querySelectorAll(".searchInput");
    const tableBody = document.getElementById("data-table");
    const tableHeading = document.querySelector(".table-heading");

    searchInputs.forEach(input => {
        input.addEventListener("keyup", async function () {
            const searchTerm = input.value.trim();
            const tableName = tableHeading.textContent.trim();

            if (searchTerm === "") {
                fetchData(tableName); // Nếu rỗng, tải lại dữ liệu gốc
                return;
            }

            try {
                const response = await fetch(`http://localhost:3333/students/search?q=${encodeURIComponent(searchTerm)}&table=${encodeURIComponent(tableName)}`);
                const data = await response.json();

                tableBody.innerHTML = ""; // Xóa dữ liệu cũ
                let tableHeader = "";

                if (tableName === "Khách hàng" || tableName === "Nhân viên") {
                    tableHeader = `<tr>
                        <th>ID</th><th>Họ Tên</th><th>CCCD</th><th>Tuổi</th><th>Giới Tính</th><th>Số Điện Thoại</th>
                    </tr>`;
                    data.forEach((item) => {
                        const row = `<tr>
                            <td>${item.id_nhanVien || item.id_khachHang || "N/A"}</td>
                            <td>${item.hoTen || "N/A"}</td>
                            <td>${item.cccd || "N/A"}</td>
                            <td>${item.tuoi !== undefined ? item.tuoi : "N/A"}</td>
                            <td>${item.gioiTinh || "N/A"}</td>
                            <td>${item.sdt || "N/A"}</td>
                        </tr>`;
                        tableBody.innerHTML += row;
                    });
                } else if (tableName === "Phòng") {
                    tableHeader = `<tr><th>Số Phòng</th><th>Loại Phòng</th><th>Giá Phòng</th></tr>`;
                    data.forEach((item) => {
                        const row = `<tr>
                            <td>${item.so_phong || "N/A"}</td>
                            <td>${item.loai_phong || "N/A"}</td>
                            <td>${item.gia_phong || "N/A"}</td>
                        </tr>`;
                        tableBody.innerHTML += row;
                    });
                } else if (tableName === "Hóa đơn") {
                    tableHeader = `<tr><th>Mã Hóa Đơn</th><th>Mã Khách hàng</th><th>Số phòng</th><th>Tổng tiền</th></tr>`;
                    data.forEach((item) => {
                        const row = `<tr>
                            <td>${item.id_hoaDon || "N/A"}</td>
                            <td>${item.id_khachHang || "N/A"}</td>
                            <td>${item.so_phong || "N/A"}</td>
                            <td>${item.giaTien || "N/A"}</td>
                        </tr>`;
                        tableBody.innerHTML += row;
                    });
                } else if (tableName === "Phục vụ") {
                    tableHeader = `<tr><th>ID Nhân Viên</th><th>ID Khách hàng</th></tr>`;
                    data.forEach((item) => {
                        const row = `<tr>
                            <td>${item.id_nhanVien || "N/A"}</td>
                            <td>${item.id_khachHang || "N/A"}</td>
                        </tr>`;
                        tableBody.innerHTML += row;
                    });
                }

                document.querySelector(".table-content thead").innerHTML = tableHeader;

            } catch (error) {
                console.error("Lỗi tìm kiếm:", error);
            }
        });
    });
});


