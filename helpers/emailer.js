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
        to: `${emailAddress}`, // when done testing swap Rio's email for emailAddress 
        subject: `${userName}, Here's Your Recommendation!`,
        html: personalizedEmail + `
       
        If you found value in this message and would like to connect further, I welcome the opportunity to engage. Please feel free to reach out to me <a href=https://www.linkedin.com/in/nia-santiago->Nia's LinkedIn</a> I look forward to connecting and exploring potential opportunities together! 
        `

    
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