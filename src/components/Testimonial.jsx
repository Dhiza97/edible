import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    text: "This service is amazing! Highly recommend it to everyone.",
    image: "/user1.jpg",
  },
  {
    name: "Jane Smith",
    text: "A seamless experience from start to finish.",
    image: "/user2.jpg",
  },
  {
    name: "Samuel Green",
    text: "Customer service is top-notch. Very satisfied!",
    image: "/user3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 px-4 mb-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-Fruktur mb-6">What <span className="text-primaryColor font-Fruktur">Our Customers</span> Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={60}
                height={60}
                className="rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
              <h3 className="mt-4 font-semibold">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
