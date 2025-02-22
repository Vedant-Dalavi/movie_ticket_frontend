import "./globals.css";
import Provider from "./provider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <Provider>

          <Toaster position="bottom-center" />

          {children}
        </Provider>
      </body>
    </html>
  );
}
