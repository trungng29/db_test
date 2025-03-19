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