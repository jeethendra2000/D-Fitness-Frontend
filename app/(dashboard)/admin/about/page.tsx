"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-16 px-4 sm:px-8">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6 sm:p-10 border border-gray-100">
        {/* Page Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-8">
          About D-Fitness
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-600 text-center mb-10 leading-relaxed">
          At <span className="font-semibold text-indigo-600">D-Fitness</span>,
          we’re more than just a gym — we’re a community driven by passion,
          discipline, and transformation.
        </p>

        {/* Mission Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To make fitness accessible and enjoyable for everyone — no matter
            your starting point. We focus on building sustainable routines that
            balance{" "}
            <strong>physical strength, nutrition, and mental health</strong>.
            Our mission is to empower every member to lead a healthy, confident,
            and fulfilling lifestyle.
          </p>
        </section>

        {/* Vision Section */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To become the most trusted name in personalized fitness — where
            technology, expert guidance, and community come together to help
            people stay consistent, inspired, and strong every day.
          </p>
        </section>
      </div>
    </div>
  );
}
