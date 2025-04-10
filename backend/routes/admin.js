const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");
const { contract } = require("../web3/contract");
const { ethers } = require("ethers");

router.post("/resolve", async (req, res) => {
  try {
    const { complaintId } = req.body;

    const complaint = await Complaint.findOne({ complaintId });
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.status === "Resolved") {
      return res.status(400).json({ message: "Complaint already resolved" });
    }

    const recipientAddress = complaint.submitterWallet;
    if (!recipientAddress) {
      return res.status(400).json({ message: "Missing wallet address for reward" });
    }

    // Auto-send reward (0.01 ETH)
    const rewardAmount = "0.01";
    const tx = await contract.sendReward(recipientAddress, ethers.parseEther(rewardAmount));
    await tx.wait();

    // Update status
    complaint.status = "Resolved";
    await complaint.save();

    res.status(200).json({
      message: "✅ Reward Transferred & Complaint Resolved",
      txHash: tx.hash,
      complaintId
    });
  } catch (err) {
    console.error("❌ Error resolving complaint:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
