const express = require("express");
const {
  getAllHostedZones,
  createHostedZone,
  deleteHostedZone,
} = require("../controllers/hostedZone");
const {
  getAllDNSRecords,
  createDNSRecord,
  deleteDNSRecord,
  updateDNSRecord,
} = require("../controllers/dnsRecord");
const router = express.Router();

// hostedZone Routes
router.get("/getAllHostedZones", getAllHostedZones);
router.post("/createHostedZone", createHostedZone);
router.post("/deleteHostedZone", deleteHostedZone);

// DNSRecord Routes

router.post("/getAllDNSRecords", getAllDNSRecords);
router.post("/createDNSRecord", createDNSRecord);
router.post("/deleteDNSRecord", deleteDNSRecord);
router.post("/updateDNSRecord", updateDNSRecord);

module.exports = { router };
