const login_view = () => {
    let html = `
    <html>
    <head>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
    
        <div class="auth-views" >
            <h1> TIME RESERVATION APP </h1>
            <br>
                <form action="/login" method="POST">
                    <input class=input1 type="text" name="user_name" >
                    <button class=button1 type="submit">Log in</button>
                </form>

                <form action="/register" method="POST">
                      <input class=input1 type="text" name="user_name" >
                      <button class=button1 type="submit">Register me</button>
                </form>
        </div>
        
    </body>
    <html>
    `;

    return html;
}

module.exports.login_view = login_view;