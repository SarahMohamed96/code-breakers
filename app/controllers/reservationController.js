let Reservation = require('../models/reservation');

//Reservation controller = create, change, and delete Reservation
let reservationController = {

  createReservation: function(req, res) {

    let reservation = new Reservation(req.body);
    console.log(req.body);
    console.log(req.body.reservation_date);

    Reservation.findOne({
      serviceid: req.body.serviceid,
      reservation_date: req.body.reservation_date,
      reservation_hour: req.body.reservation_hour
    }, function(err, trackReservation) {
      if (trackReservation) {
        var title = "This slot is booked. Please try reserving another slot.";
        res.json(title);
        console.log(title);
      }
      if (!(trackReservation)) {
        reservation.save(function(err, reservation) {
          if (err) {
            res.send(err.message)
            console.log(err);
          } else {
            var title = "You've reserved the slot. Please proceed to pay and get your reservation confirmation.";
            res.json(title);
            console.log(title);
          }
        })
      }
    });
  },


  changeReservation: function(req, res) {
    console.log(req.body);
    console.log('hiho');

    Reservation.findOne({
      serviceid: req.body.serviceid,
      userName: req.body.userName,
      reservation_date: req.body.old_reservation_date,
      reservation_hour: req.body.old_reservation_hour
    }, function(err, trackReservation4) {
      if (trackReservation4) {
        trackReservation4.reservation_date = req.body.new_reservation_date;
        trackReservation4.reservation_hour = req.body.new_reservation_hour;
        trackReservation4.save(function(err, reservation) {
          if (err) {
            res.send(err.message)
            console.log(err);
          } else {
            var title2 = "We've successfully changed your reservation.";
            res.json(title2);
            console.log(title2);
          }
        })
            // trackReservation4.update({
            //   reservation_date: req.body.new_reservation_date,
            //   reservation_hour: req.body.new_reservation_hour
            // });

          }
      if (!(trackReservation4)) {
        var title2 = ":( There is no reservation. Please check your info and try again.";
        res.json(title2);
      }
    });
  },


  deleteReservation: function(req, res) {
    let reservation = new Reservation(req.body);
    Reservation.findOne({
      userName: req.body.userName,
      serviceid: req.body.serviceid,
      reservation_date: req.body.reservation_date,
      reservation_hour: req.body.reservation_hour
    }, function(err, trackReservation3) {
      if (trackReservation3) {
        Reservation.deleteReservation(trackReservation3, function(err) {
          console.log("Deleted!");
        });
        var title3 = "We've successfully cancelled your reservation.";
        res.json(title3);
        console.log(title3);
      }
      if (!(trackReservation3)) {
        var title3 = ":( There is no reservation. Please check your info and try again.";
        res.json(title3);
        console.log(title3);
      }
    });
  }

}


module.exports = reservationController;
