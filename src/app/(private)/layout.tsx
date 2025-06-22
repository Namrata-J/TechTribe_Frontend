// call api's for respective pages on their initial load = for pages
// check if their response valid the token if not redirect to login = for pages
// when trying to access private route, check if they are eligible to access it

import React from "react";
import Container from "@mui/material/Container";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { AlertComp } from "@/components/alert/Alert";
import { PrivateRoutesGuard } from "@/components/PrivateRoutesGuard";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <PrivateRoutesGuard />
      <Header isAppHeader={true} />
      <AlertComp />
      {children}
      <Footer />
    </Container>
  );
}
