



const reservations_view = ((data) => {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" href="/css/style.css">
    </head> 
    <body>
         <div class="list-views" >

            <h1> TIME RESERVATION APP </h1>
            
            <h2> Welcome  ${data.user_name}! </h2>
           
           
            <form  style="display:inline" action="/add-reservation" method="POST">
                <input class=input2 type="text" name="reservation_name" value="add new reservation name, start time and end ">
                <input class=input2 type="datetime-local" name="reservation_start" >
                <input class=input2 type="datetime-local" name="reservation_end" >
                <input class=input2 type="text" name="reservation_comment" value="comment">
                
                <button class=button4 type="submit">Add new reservation</button>
            </form>
            <form  style="display:inline" action="/logout" method="POST">
                <button class=button2 type="submit">Log out</button>
            </form>
            <h2> All reservations: <h2>
        </div>
        `;

        
    data.reservations.forEach((reservation) => {
        html += `
        
        <div class="list-views2" > 
        
        <h3>${reservation.name}</h3>
        <h3> start: ${reservation.start.toDateString()} ${reservation.start.getHours()}:${reservation.start.getMinutes()} end: ${reservation.end.toDateString()} ${reservation.end.getHours()}:${reservation.end.getMinutes()} </h3>
        <h3> Duration:${reservation.duration} comment: ${reservation.comment} </h3>
        
        
    
        
        
        
            
            <form style="display:inline" action="delete-reservation" method="POST">
                <input type="hidden" name="reservation_id" value="${reservation._id}">
                <button  class=button3 type="submit">Delete reservation</button>
             
            </form>
            
            <form  style="display:inline" action="update-reservation" method="POST">
            <input type="hidden" name="reservation_id_check" value="${reservation._id}">
            <button class=button5 type="submit">Update reservation</button>
            </form>
        </div>
            

            `;
        });
    
        html += `
       
        
    </html>
    </body>
    `;
    return html;
});


const reservation_view = (data) => {
    let html = `
    <html>
    <body>
    reservation name: ${data.name}
    reservation start: ${data.start}
    reservation end: ${data.end}
    
    reservation comment: ${data.comment}
    </body>
    </html>
    `;
    return html;
};

module.exports.reservations_view = reservations_view;
module.exports.reservation_view = reservation_view;