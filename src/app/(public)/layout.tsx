import React from "react";
import Container from "@mui/material/Container";
import { Header } from "@/components/header/Header";

export default function PublicLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode;
}) {

  return (
    <Container>
      <Header isAppHeader={false} />
      {children}
      {modal}
    </Container>
  );
}
