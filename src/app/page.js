import Feature from "./components/feature/Feature";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Welcome to Next.js!</h1>
      <p className="text-lg text-secondary">This is the home page.</p>

      {/* feature section */}
      <Feature />
    </div>
  );
}
