import React from "react";
import Container from "@mui/material/Container";
import { Header } from "@/components/header/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
