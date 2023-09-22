import React from "react";
import { useParams } from "react-router-dom";

import LeftNav from "../components/LeftNav";
import Dashboard from "../components/Dashboard";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 117px auto;
  nav {
    grid-column: 1;
  }
  main {
    grid-column: 2;
  }
`;

export default function UserPage() {
  const { id } = useParams();

  return (
    <Container>
      <LeftNav />
      <Dashboard id={id} /> { }
    </Container>
  );
}