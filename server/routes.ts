import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getUncachableResendClient } from "./lib/resend";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const { client, fromEmail } = await getUncachableResendClient();

      console.log(`Attempting to send email from: ${fromEmail} to: adityakan2000@gmail.com`);

      const result = await client.emails.send({
        from: fromEmail,
        to: 'adityakan2000@gmail.com',
        replyTo: email,
        subject: `New Contact Form Message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Reply to this email to respond directly to ${email}</p>
        `,
      });

      console.log("Email sent successfully:", result);
      
      // Check if there was an error even with 200 response
      if (result.error) {
        console.error("Resend error:", result.error);
        return res.status(500).json({ 
          error: "Email configuration error", 
          details: result.error.message 
        });
      }
      
      res.json({ success: true, message: "Email sent successfully", emailId: result.data?.id });
    } catch (error: any) {
      console.error("Error sending email:", error);
      console.error("Error details:", error.message, error.statusCode);
      res.status(500).json({ 
        error: "Failed to send email", 
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
