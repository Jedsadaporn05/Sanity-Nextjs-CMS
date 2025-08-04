import React from "react";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";

type Attraction = {
  _id: string;
  _type: "attraction";
  name: string;
  detail: string;
  coverimage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  latitude: number;
  longitude: number;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});

// Sanity image url
const builder = imageUrlBuilder(client);
// Sanity image url function
function urlFor(source: Attraction["coverimage"]) {
  if (!source) return builder.image("");
  return builder.image(source);
}

export default async function Home() {
  const attractions: Attraction[] = await client.fetch(
    `*[_type == "attraction"]`
  );
  // console.log(attractions);

  return (
    <div className="w-full h-full lg:h-screen py-6">
      <main className="w-full h-full mx-auto my-6">
        <h1 className="text-3xl font-bold my-6 text-black">Attractions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.length > 0 && (
            <>
              {attractions.map((attraction) => (
                <div
                  className="bg-grey-500 rounded-2xl p-6 text-black shadow-lg"
                  key={attraction._id}
                >
                  <div className="font-semibold my-2 text-lg">
                    {attraction?.name} <br />
                  </div>
                  <Image
                    src={urlFor(attraction?.coverimage).width(500).url()}
                    alt={attraction?.name}
                    width={500}
                    height={500}
                  />{" "}
                  <br />
                  {attraction?.detail} <br />
                  {attraction?.latitude} {attraction?.longitude} <br />
                  <Link
                    href={"/attractions/" + attraction?._id}
                    className="border-b-1 hover:border-b-2 hover:border-b-green-500"
                  >
                    Learn more
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
