"use client";

import React, { useState } from "react";
import { API_BASE_URL } from "@/configs/constants"; // Ensure this points to your .NET API

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    try {
      // Assuming your controller is [Route("api/[controller]")] -> api/Enquiries
      const response = await fetch(`${API_BASE_URL}/Enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to submit enquiry");
      }

      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="leave-comment">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          maxLength={15}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Submitting..." : "Submit"}
        </button>

        {status.message && (
          <div
            style={{
              marginTop: "15px",
              color: status.type === "success" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
