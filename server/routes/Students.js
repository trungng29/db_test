const express = require("express");
const router = express.Router();
const { executeQuery } = require("../db.js");

router.get("/allStudents", async (req, res) => {
  const query = "SELECT * FROM dbo.KhachHang";
  const values = [];
  const paramNames = [];
  const isStoredProcedure = false;
  try {
    const result = await executeQuery(
      query,
      values,
      paramNames,
      isStoredProcedure
    );
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/allNhanVien", async (req, res) => {
    const query = "SELECT * FROM dbo.NhanVien";
    const values = [];
    const paramNames = [];
    const isStoredProcedure = false;
    try {
      const result = await executeQuery(
        query,
        values,
        paramNames,
        isStoredProcedure
      );
      res.send(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

router.get("/allPhong", async (req, res) => {
    const query = "SELECT * FROM dbo.Phong";
    const values = [];
    const paramNames = [];
    const isStoredProcedure = false;
    try {
      const result = await executeQuery(
        query,
        values,
        paramNames,
        isStoredProcedure
      );
      res.send(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

router.get("/allHoaDon", async (req, res) => {
    const query = "SELECT * FROM dbo.HoaDon";
    const values = [];
    const paramNames = [];
    const isStoredProcedure = false;
    try {
      const result = await executeQuery(
        query,
        values,
        paramNames,
        isStoredProcedure
      );
      res.send(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

router.get("/allPhucVu", async (req, res) => {
    const query = "SELECT * FROM dbo.PhucVu";
    const values = [];
    const paramNames = [];
    const isStoredProcedure = false;
    try {
      const result = await executeQuery(
        query,
        values,
        paramNames,
        isStoredProcedure
      );
      res.send(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

router.get("/preQueryAge20", async (req, res) => {
  const query = `SELECT KH.* FROM KhachHang KH
                WHERE KH.tuoi > 20
                ORDER BY KH.tuoi ASC`;
  const values = [];
  const paramNames = [];
  const isStoredProcedure = false;
  try {
    const result = await executeQuery(
      query,
      values,
      paramNames,
      isStoredProcedure
    );
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/createStudent", async (req, res) => {
  const { id_khachHang, hoTen, cccd, tuoi, gioiTinh, sdt } = req.body;
  if (!id_khachHang || !hoTen || !cccd || !tuoi || !gioiTinh || !sdt) {
    return res.status(400).send({ message: "Thiếu dữ liệu!" });
  }

  const query = `INSERT INTO dbo.KhachHang (id_khachHang, hoTen, cccd, tuoi, gioiTinh, sdt) 
                 VALUES (@id_khachHang, @hoTen, @cccd, @tuoi, @gioiTinh, @sdt)`;
  const values = [id_khachHang, hoTen, cccd, tuoi, gioiTinh, sdt];
  const paramNames = ["id_khachHang", "hoTen", "cccd", "tuoi", "gioiTinh", "sdt"];
  const isStoredProcedure = false;

  try {
    await executeQuery(query, values, paramNames, isStoredProcedure);
    res.status(201).send({ message: "Khách hàng đã được thêm!" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete("/deleteStudent/:id", async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM dbo.KhachHang WHERE id_khachHang = @id";
  const values = [id];
  const paramNames = ["id"];
  const isStoredProcedure = false;

  try {
    await executeQuery(query, values, paramNames, isStoredProcedure);
    res.status(200).send({ message: "Xóa khách hàng thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.put("/updateStudent/:id", async (req, res) => {
  const { id } = req.params;
  const { hoTen, cccd, tuoi, gioiTinh, sdt } = req.body;

  if (!hoTen || !cccd || !tuoi || !gioiTinh || !sdt) {
    return res.status(400).send({ message: "Thiếu dữ liệu!" });
  }

  const query = `UPDATE dbo.KhachHang 
                 SET hoTen = @hoTen, cccd = @cccd, tuoi = @tuoi, gioiTinh = @gioiTinh, sdt = @sdt 
                 WHERE id_khachHang = @id`;
  const values = [hoTen, cccd, tuoi, gioiTinh, sdt, id];
  const paramNames = ["hoTen", "cccd", "tuoi", "gioiTinh", "sdt", "id"];
  const isStoredProcedure = false;

  try {
    const result = await executeQuery(query, values, paramNames, isStoredProcedure);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).send({ message: "Không tìm thấy khách hàng để cập nhật!" });
    }
    res.status(200).send({ message: "Cập nhật khách hàng thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});




router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;
  const tableName = req.query.table;

  if (!searchTerm || !tableName) {
      return res.status(400).send({ message: "Thiếu từ khóa tìm kiếm hoặc bảng!" });
  }

  let query = "";
  switch (tableName) {
      case "Khách hàng":
          query = `SELECT * FROM dbo.KhachHang 
                   WHERE CAST(id_khachHang AS NVARCHAR) LIKE @searchTerm 
                      OR hoTen LIKE @searchTerm 
                      OR CAST(cccd AS NVARCHAR) LIKE @searchTerm 
                      OR CAST(tuoi AS NVARCHAR) LIKE @searchTerm 
                      OR gioiTinh LIKE @searchTerm 
                      OR CAST(sdt AS NVARCHAR) LIKE @searchTerm`;
          break;
      case "Nhân viên":
          query = `SELECT * FROM dbo.NhanVien 
                   WHERE CAST(id_nhanVien AS NVARCHAR) LIKE @searchTerm 
                      OR hoTen LIKE @searchTerm 
                      OR CAST(cccd AS NVARCHAR) LIKE @searchTerm 
                      OR CAST(tuoi AS NVARCHAR) LIKE @searchTerm 
                      OR gioiTinh LIKE @searchTerm 
                      OR CAST(sdt AS NVARCHAR) LIKE @searchTerm`;
          break;
      case "Phòng":
          query = `SELECT * FROM dbo.Phong 
                   WHERE CAST(so_phong AS NVARCHAR) LIKE @searchTerm 
                      OR loai_phong LIKE @searchTerm 
                      OR CAST(gia_phong AS NVARCHAR) LIKE @searchTerm`;
          break;
      case "Hóa đơn":
          query = `SELECT * FROM dbo.HoaDon 
                   WHERE CAST(id_hoaDon AS NVARCHAR) LIKE @searchTerm 
                      OR CAST(id_khachHang AS NVARCHAR) LIKE @searchTerm 
                      OR CAST(so_phong AS NVARCHAR) LIKE @searchTerm 
                      OR CAST(giaTien AS NVARCHAR) LIKE @searchTerm`;
          break;
      case "Phục vụ":
          query = `SELECT * FROM dbo.PhucVu 
                   WHERE CAST(id_nhanVien AS NVARCHAR) LIKE @searchTerm 
                      OR CAST(id_khachHang AS NVARCHAR) LIKE @searchTerm`;
          break;
      default:
          return res.status(400).send({ message: "Bảng không hợp lệ!" });
  }

  const values = [`%${searchTerm}%`];
  const paramNames = ["searchTerm"];
  const isStoredProcedure = false;

  try {
      const result = await executeQuery(query, values, paramNames, isStoredProcedure);
      res.send(result.recordset);
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
});


module.exports = { router };