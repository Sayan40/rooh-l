import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().nonempty("Пожалуйста, введите ваше имя"),
  phone: z
    .string()
    .nonempty("Пожалуйста, введите ваш телефон")
    .regex(
      /^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
      "Пожалуйста, введите корректный номер телефона"
    ),
  email: z
    .string()
    .nonempty("Пожалуйста, введите ваш email")
    .email("Пожалуйста, введите корректный email"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = schema.parse(req.body);

      const transporter = nodemailer.createTransport({
        host: "mail.adm.tools",
        port: 2525,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO_USER,
        subject: "New Contact Form Submission",
        text: `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Mail sent successfully!", data });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }

      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
