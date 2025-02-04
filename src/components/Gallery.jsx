import Image from "next/image";

const images = [
  "/image_1.jpg",
  "/image_2.jpg",
  "/image_3.jpg",
  "/image_4.jpg",
  "/image_5.jpg",
  "/image_1.jpg",
  "/image_7.jpg",
  "/image_8.jpg",
  "/image_2.jpg",
];

export default function Gallery() {
  return (
    <div className="text-center px-5 lg:px-8 xl:px-[8%] my-20">
        <h2 className="text-4xl font-Fruktur py-6">Our <span className="text-primaryColor font-Fruktur">Gallery</span></h2>
      <div className="grid grid-cols-3 gap-0 w-full mx-auto ">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden">
            <Image
              src={src}
              alt={`Gallery Image ${index + 1}`}
              width={300}
              height={300}
              className="w-full h-auto transform transition duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
