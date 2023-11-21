import Link from "next/link";
import {Header } from "ui";

export default function Page() {
  return (
    <div>
      <Header children={<div>asdasd</div>} links={[]} LinkComponent={Link}/>
    </div>
  );
}
