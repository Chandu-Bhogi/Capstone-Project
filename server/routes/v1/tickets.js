const express = require("express");
const tickets = require("../../controllers/tickets");


const router = express.Router();

router.get("/getalltickets", tickets.getAllTickets);
//Fetch all tickets by PARTIAL id or PARTIAL description using query params.
router.get("/getticket", tickets.getTicket);

router.post("/createticket", tickets.createTicket);

router.put("/updateticket/:id", tickets.updateTicket);

router.delete("/deletetticket", tickets.deleteTicket);

module.exports = router;
