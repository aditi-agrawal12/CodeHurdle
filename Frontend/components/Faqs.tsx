
"use client";

import React from "react";
import Image from "next/image";
import PlusIcon from "../assets/plus-s.png";
import clsx from "clsx";
import PlusBlack from "../assets/plus-s-black.png"

const items = [
  {
    question: "What is the purpose of this platform?",
    answer:
      "This platform is designed to help users improve their problem-solving skills in data structures and algorithms (DSA) and competitive programming (CP).",
  },
  {
    question: "How can I get started?",
    answer:
      "You can get started by signing up for a free account and exploring the available resources and practice problems.",
  },
  {
    question: "Is there a community for support?",
    answer:
      "Yes, we have a vibrant community where you can connect with other learners and experts to share knowledge and tips.",
  },
  {
    question: "Are there any personalized recommendations?",
    answer:
      "Yes, we provide tailored recommendations based on your skill level and interests to help you progress effectively.",
  },
  {
    question: "What are the benefits of using this platform?",
    answer:
      "The platform offers a comprehensive set of resources, personalized learning paths, and a supportive community to enhance your coding skills.",
  },
];

const AccordianItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="py-5 border-b border-[var(--card-border)] cursor-pointer transition-all duration-300 hover:border-purple-400/30"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-4">
        <span className="flex-1 text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors">
          {question}
        </span>
        <Image
          src={PlusIcon} // use white icon here
          alt="Toggle answer"
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-45" : ""} invert dark:invert-0`}
        />

      </div>
      <div
        className={clsx(
          "mt-3 text-muted-foreground overflow-hidden transition-all duration-300",
          {
            "max-h-0": !isOpen,
            "max-h-96 pb-4": isOpen,
          }
        )}
      >
        {answer}
      </div>
    </div>
  );
};

export const FAQs = () => {
  return (
    <div className="bg-background text-foreground py-20 relative overflow-hidden" id="faqs">
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-600">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-muted-foreground">
            Can't find what you're looking for?{" "}
            <span className="text-pink-600">
              Contact our support team
            </span>
            .
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto bg-[var(--card-background)] border border-[var(--card-border)] rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-md">
          {items.map(({ question, answer }) => (
            <AccordianItem key={question} question={question} answer={answer} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button
            className="relative bg-gradient-to-r from-purple-800 to-purple-600 text-white py-3 px-8 rounded-full font-bold cursor-pointer transition-all duration-300 shadow-lg group overflow-hidden hover:shadow-purple-500/50"
            onClick={() =>
              (window.location.href = "http://codehurdle.com/auth/google")
            }
          >
            <span className="relative z-10">Get Started Now</span>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;

