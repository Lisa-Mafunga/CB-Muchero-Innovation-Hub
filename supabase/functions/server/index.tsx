import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ac2e77ab/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all service bookings
app.get("/make-server-ac2e77ab/bookings", async (c) => {
  try {
    const bookings = await kv.getByPrefix("booking:");
    return c.json({ success: true, bookings });
  } catch (error) {
    console.log(`Error fetching bookings: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create a service booking
app.post("/make-server-ac2e77ab/bookings", async (c) => {
  try {
    const body = await c.req.json();
    const { service, name, email, phone, date, time, message } = body;
    
    if (!service || !name || !email || !phone) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    const bookingId = `booking:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const booking = {
      id: bookingId,
      service,
      name,
      email,
      phone,
      date,
      time,
      message,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    await kv.set(bookingId, booking);
    return c.json({ success: true, booking });
  } catch (error) {
    console.log(`Error creating booking: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all contact form submissions
app.get("/make-server-ac2e77ab/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix("contact:");
    return c.json({ success: true, contacts });
  } catch (error) {
    console.log(`Error fetching contacts: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create a contact form submission
app.post("/make-server-ac2e77ab/contacts", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, subject, message } = body;
    
    if (!name || !email || !message) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    const contactId = `contact:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const contact = {
      id: contactId,
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    await kv.set(contactId, contact);
    return c.json({ success: true, contact });
  } catch (error) {
    console.log(`Error creating contact: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all chat messages
app.get("/make-server-ac2e77ab/chat", async (c) => {
  try {
    const messages = await kv.getByPrefix("chat:");
    return c.json({ success: true, messages });
  } catch (error) {
    console.log(`Error fetching chat messages: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create a chat message
app.post("/make-server-ac2e77ab/chat", async (c) => {
  try {
    const body = await c.req.json();
    const { message, userId, isBot } = body;
    
    if (!message) {
      return c.json({ success: false, error: "Message is required" }, 400);
    }

    const chatId = `chat:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const chatMessage = {
      id: chatId,
      message,
      userId: userId || "anonymous",
      isBot: isBot || false,
      createdAt: new Date().toISOString()
    };

    await kv.set(chatId, chatMessage);
    
    // Auto-respond with bot message if it's a user message
    if (!isBot) {
      const botResponse = generateBotResponse(message);
      const botChatId = `chat:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const botMessage = {
        id: botChatId,
        message: botResponse,
        userId: userId || "anonymous",
        isBot: true,
        createdAt: new Date().toISOString()
      };
      await kv.set(botChatId, botMessage);
      
      return c.json({ success: true, userMessage: chatMessage, botMessage });
    }

    return c.json({ success: true, message: chatMessage });
  } catch (error) {
    console.log(`Error creating chat message: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Simple chatbot response generator
function generateBotResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! Welcome to CB Muchero Innovation Hub. How can I help you today?";
  } else if (msg.includes("services") || msg.includes("what do you offer")) {
    return "We offer Basic Computer & Smartphone Literacy Training, Advanced Digital Skills (Digital Marketing, Robotics & AI), Mentorship & Career Guidance, and Virtual Training Sessions. Which service interests you?";
  } else if (msg.includes("book") || msg.includes("schedule") || msg.includes("appointment")) {
    return "Great! You can book a service by visiting our Services page and selecting the program you're interested in. Would you like me to help you with anything specific?";
  } else if (msg.includes("price") || msg.includes("cost") || msg.includes("fee")) {
    return "For pricing information, please contact us directly at cbmucheroinnovationhub@gmail.com or call +263 717 988 630. Our team will be happy to discuss packages tailored to your needs.";
  } else if (msg.includes("location") || msg.includes("where")) {
    return "We're based in Harare, Zimbabwe, and also offer virtual training sessions. Contact us for more details about our locations.";
  } else if (msg.includes("contact") || msg.includes("email") || msg.includes("phone")) {
    return "You can reach us at cbmucheroinnovationhub@gmail.com or call +263 717 988 630. We're here to help!";
  } else if (msg.includes("about") || msg.includes("who are you")) {
    return "CB Muchero Innovation Hub was founded in 2023 by Rutendo Whitney Muchero. We empower women and girls with essential digital skills through accessible training. Our mission is to empower 6000 women by 2030!";
  } else {
    return "Thank you for your message! For specific inquiries, please contact us at cbmucheroinnovationhub@gmail.com or call +263 717 988 630. Our team will get back to you shortly.";
  }
}

Deno.serve(app.fetch);