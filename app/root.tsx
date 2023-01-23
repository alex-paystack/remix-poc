import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { useContext, useEffect } from "react";

import ClientStyleContext from "./styles/client.context";
import { createTheme } from "./styles/stitches";
import { ErrorContainer } from "./components/ErrorContainer";


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix with Stitches",
  viewport: "width=device-width,initial-scale=1",
});

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const darkTheme = createTheme({
  colors: {
    error01: "green",
  },
});

const Document = ({ children, title }: DocumentProps) => {
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEffect(() => {
    // reset cache to re-apply global styles
    clientStyleData.reset();
  }, [clientStyleData]);

  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: clientStyleData.sheet }}
          suppressHydrationWarning
        />
      </head>
      <body className={darkTheme} style={{ backgroundColor: "#fafafa" }}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

// Global catch boundary
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ErrorContainer style={{ fontFamily: "graphik" }}>
        <p>
          [CatchBoundary]: {caught.status} {caught.statusText}
        </p>
      </ErrorContainer>
    </Document>
  );
}

// Global error boundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <ErrorContainer style={{ fontFamily: "graphik" }}>
        <p>[ErrorBoundary]: There was an error: {error.message}</p>
      </ErrorContainer>
    </Document>
  );
}
