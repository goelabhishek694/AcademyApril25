import fs from "fs";
import path from "path";
import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_X8r5m9bL_GjHEqFST3FTb3aQdNRKyjAdx");

function replaceContent(content, data){
    const keys = Object.keys(data);
    keys.forEach(key =>{
        content = content.replace(`#{${key}}`, data[key]);
    })
    return content;
}

async function emailHelper(templateName, receiverEmail, data){
    try{
        const templatePath = path.join( process.cwd(), "email_templates", `${templateName}.html`);
        let content = await fs.promises.readFile(templatePath, "utf-8");
        content = replaceContent(content, data);

        const emailDetails = {
            from: "Abhishek <onboarding@resend.dev>",
            to: "goelabhishek694@gmail.com",
            subject: "Mail from ScalerShows",
            text:"Hello World",
            html: content
        }

        const response = await resend.emails.send(emailDetails);
        
    }catch(err){
        console.log(err);
    }
}

await emailHelper("otp","test@test.com",{otp: "123456", name: "Mustafa"});

export default emailHelper;