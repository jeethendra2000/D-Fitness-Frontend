import { Atom } from "react-loading-indicators";

interface LoaderProps {
  message: string;
  dimBackground?: boolean;
}

export default function Loader({ message, dimBackground }: LoaderProps) {
  return (
      <div 
      id="preloder"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: dimBackground ? "#111111" : "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
      aria-label="Loading"
      role="status"
      >

      <Atom color="#ffffff" size="medium" text="" textColor="" />
      {message && (
        <span
          style={{
            color: "#fff",
            fontSize: 16,
            letterSpacing: 1,
            fontWeight: 500,
          }}
        >
          {message}
        </span>
      )}
      </div>
    );
}
