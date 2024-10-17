import Image from "next/image";
import styles from "./page.module.css";
import MainHeader from "@/components/main/header";
import PostList from "@/components/main/postList";

export default function Home() {
  return <div>
    <PostList/>
  </div>;
}
