import Aurora from "./aurora.tsx";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0">
      <Aurora
        colorStops={["#39FF14", "#6A0DAD", "#00FFCC"]}
        blend={0.5}
        amplitude={1.4}
        speed={0.8}
      />
    </div>
  );
}
