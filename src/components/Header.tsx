export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center shadow-xl mb-4 p-4 pr-8">
      <h1 className="text-2xl font-bold">RSA tool</h1>
      <a href="https://github.com/sws6546/rsa_tool">
        <img src="/public/github.svg" alt="github logo" className="w-10 h-10" />
      </a>
    </header>
  )
}