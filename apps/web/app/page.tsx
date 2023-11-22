"use client";
import Link from "next/link";
import {Header } from "ui";

export default function Page() {
  return (
    <div>
      <Header links={[{name:"test", href:"localhost"}]} LinkComponent={Link}>
      </Header>
    </div>
  );
}
