import Image from "next/image";
import landingImage from "../../public/landing.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <div className="lg:w-1/2 lg:pr-12 flex flex-col lg:text-left text-center">
          <h1 className="text-4xl lg:text-6xl font-bold capitalize my-6 lg:my-10 text-left">
            All Your Formulas at One Place
          </h1>
          <p className="text-lg text-gray-700">
            Check out the website to see all available formulas.
          </p>
          <div className="flex justify-center lg:justify-start mt-6">
            <Link href="/subjects" className="btn btn-accent">
              Check My Formula Skills
            </Link>

            <Link href="/add-formula" className="btn btn-outline ml-4">
              Get Started
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <Image
            src={landingImage}
            width={1000}
            height={600}
            alt="Formula"
            className="rounded-lg shadow-lg object-cover object-center          border-2 border-gray-200
            "
          />
        </div>
      </div>
    </main>
  );
}
