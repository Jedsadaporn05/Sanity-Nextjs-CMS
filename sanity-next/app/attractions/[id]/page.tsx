import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
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

// สามารถเขียนตรง Props เป็น Attraction({ params: { id: string } }) { แทนได้เหมือนกัน
type Props = {
  params: {
    id: string;
  };
};

export default async function Attraction({ params }: Props) {
  const { id } = params;

  const attraction: Attraction = await client.fetch(
    `*[_type == "attraction" && _id == $id][0]`,
    { id }
  );

  if (!attraction)
    return (
      <main>
        <h1>Attraction not found</h1>
      </main>
    );

  return (
    <div className="w-full h-screen">
      <main className="w-100 h-full mx-auto my-6">
        <div className="flex flex-col justify-center bg-grey-500 rounded-2xl p-6 text-black shadow-lg">
          <div className="font-semibold my-2 text-lg">{attraction.name}</div>
          <Image
            src={urlFor(attraction?.coverimage).width(500).url()}
            alt={attraction?.name}
            width={500}
            height={500}
          />{" "}
          <p className="pt-5">{attraction.detail}</p>
          <p>
            <span className="text-blue-500">latitude</span> {attraction.latitude}{" "}
            <span className="text-red-500">longitude</span>{" "}
            {attraction.longitude}
          </p>
        </div>
      </main>
    </div>
  );
}
