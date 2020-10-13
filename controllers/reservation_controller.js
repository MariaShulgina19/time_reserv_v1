const reservation_model = require('../models/reservation-model');
const reservation_views = require('../views/reservation-views');


// ./.

//READ all reservation pr user
const get_reservations = (req, res, next) => {
    const user = req.user;
    user.populate('reservations')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                reservations: user.reservations
            };
            let html = reservation_views.reservations_view(data);
            res.send(html);
           // res.send(JSON.stringify(data))
        }).catch(err => {
            //res.status(500);
            //res.send(err.errmsg);
            console.log(err);
        });
};


//DELETE

const post_delete_reservation = (req, res, next) => {
    const user = req.user;
    const reservation_id_to_delete = req.body.reservation_id;

    //Remove reservation from user.reservations
    const updated_reservations = user.reservations.filter((reservation_id) => {
        return reservation_id != reservation_id_to_delete;
    });
    user.reservations = updated_reservations;

    //Remove reservation object from database
    user.save().then(() => {
        reservation_model.findByIdAndRemove(reservation_id_to_delete).then(() => {
            res.redirect('/');
        });
    }).catch(err => {
        //res.status(500);
        //res.send(err.errmsg);
        console.log(err);
    });
};

const post_back_to_reservation = (req, res, next) => {
   
    res.redirect('/');
};

//READ /GET

const get_reservation = (req, res, next) => {
    const reservation_id = req.params.id;
    reservation_model.findOne({
        _id: reservation_id
    }).then((reservation) => {
        let data = {
            name: reservation.name,
            start: reservation.start,
            end: reservation.end,
            duration: reservation.duration,
            comment:reservation.comment
        };
        let html = reservation_views.reservation_view(data);
        res.send(html);
    }).catch(err => {
        //res.status(500);
        //res.send(err.errmsg);
        console.log(err);
    });
};

//POST

const post_reservation = (req, res, next) => {
    const user = req.user;
    const time_stamp = new Date();
    let new_reservation = reservation_model({

        name:       req.body.reservation_name,
        start:      new Date(req.body.reservation_start),
        end:        new Date(req.body.reservation_end),
        duration:   new Date(req.body.reservation_end)-new Date(req.body.reservation_start),
        comment:    req.body.reservation_comment
        
    });
    
       // if  (req.body.reservation_end > req.body.reservation_start && new_reservation.start > time_stamp ){

            new_reservation.save().then(() => {
                console.log('reservation saved');
                user.reservations.push(new_reservation);
                user.save().then(() => {
                    return res.redirect('/');
                });
            }).catch(err => {
                //res.status(500);
                //res.send(err.errmsg);
                console.log(err);
            });                   
        // }   

        // else {
        //     //res.send("end time shall be after start time")
        //     console.log("start time shall be before time and in future");
        //    // return res.redirect('/');
        //      };
};

//UPDATE POST/PUT

const post_update_reservation = (req, res, next) => {   //put-update-reservation
    const user = req.user;
    const reservation_id_to_check= req.body.reservation_id_check; 
    id=reservation_id_to_check; 
    console.log('reservation to update', reservation_id_to_check);
   
    
    let data = {

        name:       req.body.reservation_name,
        start:      new Date(req.body.reservation_start),
        end:        new Date(req.body.reservation_end),
        duration:   new Date(req.body.reservation_end)-new Date(req.body.reservation_start),
        comment:    req.body.reservation_comment
         };

    console.log (data);

   
        reservation_model.findByIdAndUpdate(id, data, {
            new:true
                   
        }).then(() => {
       
        res.redirect('/')
        }).catch(err => {
            //res.status(500);
            //res.send(err.errmsg);
            console.log(err);
    });
   
    };


module.exports.get_reservations = get_reservations;
module.exports.get_reservation = get_reservation;
module.exports.post_reservation = post_reservation;
module.exports.post_delete_reservation = post_delete_reservation; 
module.exports.post_update_reservation = post_update_reservation;
module.exports.post_back_to_reservation=post_back_to_reservation;