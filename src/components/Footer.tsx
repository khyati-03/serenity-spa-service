export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-xl py-8 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Serenity Spa. All rights reserved.</p>
      </div>
    </footer>
  );
}
