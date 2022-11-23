import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="bg-gray-background">
        <div className="mx-auto max-w-screen-lg">
          <p className="text-center text-2xl">Not Found!</p>
        </div>
      </div>
    </>
  );
}
