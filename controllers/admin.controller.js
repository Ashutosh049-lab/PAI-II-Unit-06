

const mongoose =require("mongoose");
const Ticket = require("../models/ticket.model");


 const getReport = async (_req, res) => {
  try {
    const pipeline = [
      { $match: { status: "booked" } },
      { $lookup: { from: "events", localField: "eventId", foreignField: "_id", as: "event" } },
      { $unwind: "$event" },
      { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      {
        $group: {
          _id: "$event.category",
          bookings: { $sum: 1 },
          tickets: { $sum: "$quantity" },
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ];

    const byCategory = await Ticket.aggregate(pipeline);

    const summary = byCategory.reduce(
      (acc, cur) => {
        acc.totalbookings += cur.bookings;
        acc.totalRevenue += cur.revenue;
        return acc;
      },
      { totalbookings: 0, totalRevenue: 0 }
    );

    
    const userSpend = await Ticket.aggregate([
      { $match: { status: "booked" } },
      { $group: { _id: "$userId", spend: { $sum: "$totalAmount" } } },
      { $group: { _id: null, avg: { $avg: "$spend" } } }
    ]);

    summary.avegspendperuser = Math.round(userSpend[0]?.avg || 0);

    res.send({
      summary,
      categoryBreakdown: byCategory.map((x) => ({
        category: x._id,
        bookings: x.bookings,
        revenue: x.revenue
      }))
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};


module.exports=getReport;