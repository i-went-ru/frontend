"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Footer, Header } from "ui";
import { AuthProvider } from "./AuthContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
