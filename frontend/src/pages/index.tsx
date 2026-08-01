// arquivo raiz do frontend, onde o Next.js é inicializado
// ele é o App.tsx no React(vite), mas no Next.js é o index.tsx

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <h1 className="text-2xl font-bold">Bem-vindo à Deméter!</h1>
      </div>
    </main>
  );
}
