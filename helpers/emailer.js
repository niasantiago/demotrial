const nodemailer = require('nodemailer'); 

function useEmailer(personalizedEmail, emailAddress, userName){
    const transporter = nodemailer.createTransport ({
        service: "hotmail",
        auth: {
            user: "niasantiago26@outlook.com",
            pass: "demoday123"
        }
    }) 
    
    const options = {
        from: "niasantiago26@outlook.com",
        to: "rio.a.castillo@gmail.com", // when done testing swap Rio's email for emailAddress 
        subject: `${userName}, Here's Your Recommendation!`,
        html: personalizedEmail 
    
    }; 
    transporter.sendMail(options, function (err, info){
        if (err) {
            console.log(err); 
            return; 
        }
        
    console.log( " sent " + info.response)
    })  
      
}
module.exports = { useEmailer }