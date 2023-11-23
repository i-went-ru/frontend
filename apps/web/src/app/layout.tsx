import ToastComponent from "./toastComponent";

export const metadata = {
  title: 'I-went in love',
  description: 'Я иду до дому от айти парка',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}<ToastComponent/> </body>
    </html>
  );
}
