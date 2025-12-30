"use client";

import React from "react";
import Link from "next/link";
import {
  Target,
  Eye,
  Dumbbell,
  Users,
  HeartPulse,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section */}
      <div className="bg-indigo-700 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
        {/* Decorative Background Circles */}
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 sm:w-96 sm:h-96 bg-indigo-500 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight leading-tight">
            Forging Strength. Building Community.
          </h1>
          <p className="text-base sm:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed px-2">
            At <span className="font-bold text-white">D-Fitness</span>, we
            believe fitness is not a destination, but a way of life. We are here
            to guide, support, and inspire your journey every step of the way.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* 2. Mission & Vision Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 -mt-20 sm:-mt-24 relative z-20">
          {/* Mission Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To make fitness accessible, enjoyable, and sustainable for
              everyone. We focus on building routines that balance{" "}
              <strong className="text-indigo-600">
                physical strength, nutrition, and mental health
              </strong>
              , empowering every member to lead a confident lifestyle.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To become the most trusted name in personalized fitness — where
              <strong className="text-indigo-600">
                {" "}
                technology, expert guidance, and community
              </strong>{" "}
              come together to help people stay consistent, inspired, and strong
              every single day.
            </p>
          </div>
        </div>

        {/* 3. Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 border-y border-gray-200 py-12">
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
              500+
            </h3>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Happy Members
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
              20+
            </h3>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Expert Trainers
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
              15+
            </h3>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Programs
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
              5
            </h3>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Years of Excellence
            </p>
          </div>
        </div>

        {/* 4. Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose D-Fitness?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
              We provide more than just equipment. We provide an ecosystem
              designed for your success.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Dumbbell />}
              title="Modern Equipment"
              desc="Top-tier gym machinery and free weights maintained daily for your safety and performance."
            />
            <FeatureCard
              icon={<Users />}
              title="Expert Trainers"
              desc="Certified professionals dedicated to creating personalized plans that fit your goals."
            />
            <FeatureCard
              icon={<HeartPulse />}
              title="Holistic Approach"
              desc="We care about your health inside and out, offering nutrition advice and wellness tracking."
            />
            <FeatureCard
              icon={<Clock />}
              title="Flexible Timings"
              desc="Open from early morning to late night to fit into your busy schedule perfectly."
            />
            <FeatureCard
              icon={<CheckCircle2 />}
              title="Hygiene First"
              desc="We maintain strict sanitization protocols to ensure a safe environment for everyone."
            />
            <FeatureCard
              icon={<Users />}
              title="Community Events"
              desc="Group classes, marathons, and challenges to keep the spirit high and motivation strong."
            />
          </div>
        </div>

        {/* 5. CTA Section */}
        <div className="bg-indigo-900 rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-indigo-200 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Join D-Fitness today and take the first step towards a healthier,
              stronger, and more confident you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white !text-indigo-900 px-6 sm:px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Join Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Features
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg mr-4 shrink-0">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
