import CreateTopic from "@/components/topics/CreateTopic";

export default function Home() {

  return (
    <div className="flex items-center justify-between mt-8">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <CreateTopic />
    </div >
  );
}
