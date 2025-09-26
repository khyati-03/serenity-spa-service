import { useEffect, useState } from "react";
import ServicesGrid from "../components/ServicesGrid";
import type { ServiceItem } from "../components/ServicesGrid";
import { fetchServices } from "../services/api";

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  useEffect(() => {
    fetchServices().then(setServices);
  }, []);
  return (
    <>
      <section className="container-xl pt-10">
        <h1 className="text-2xl md:text-3xl font-semibold">All Services</h1>
      </section>
      <ServicesGrid items={services} />
    </>
  );
}
