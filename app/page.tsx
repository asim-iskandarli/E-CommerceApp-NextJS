"use client"
import { Suspense } from "react";
import Carousel from "./components/carousel";
import Products from './components/product';
import { useAuth } from "./contexts/authContext";
import Loading from "./components/loading";

export default function Home() {
  const { loading } = useAuth();

  if (loading) return <Loading />

  return (
    <Suspense>
      <Carousel />
      <Products />
    </Suspense>
  );
}
