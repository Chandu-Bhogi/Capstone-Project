const express = require("express");
const tickets = require("../../controllers/tickets");


const router = express.Router();

router.get("/getalltickets", tickets.getAlltickets);
router.get("/getticket", tickets.getTicket);

router.post("/createticket", tickets.createTicket);

router.put("/update", tickets.updateTicket);

router.delete("/deletetticket", tickets.deleteTicket);

module.exports = router;
