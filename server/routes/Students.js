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

module.exports = { router };