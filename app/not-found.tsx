"use client";

import React from "react";
import LottiePlayer from "@/components/LottiePlayer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#577eff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottiePlayer
          src="https://lottie.host/05ddd65c-6258-47b6-8346-45a48085abac/SXqU0hNPHx.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto", maxHeight: "500px" }}
        />
        <h1
          style={{
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
            marginTop: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          404 - Page Not Found
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "1.1rem",
            marginTop: "1rem",
            textAlign: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          style={{
            marginTop: "2rem",
            padding: "12px 32px",
            backgroundColor: "white",
            color: "#577eff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.1)";
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
