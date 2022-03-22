const express = require('express');
const router = express.Router();

const {createTicket, getAllTickets, getTicketById, deleteTicket, updateTicket, getTicketDataById} = require("../controllers/tickets")
router.param("ticketId",getTicketById)


router.post("/createticket",createTicket);
router.get("/viewtickets",getAllTickets);
// router.get("/ticket/:tId",getTicketDataById);
router.put("/updateticket/:ticketId",updateTicket);
router.delete("/ticket/:ticketId",deleteTicket);

module.exports = router;