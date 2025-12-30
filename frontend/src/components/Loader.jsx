export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="text-sm text-gray-600">{text}</div>
    </div>
  );
}
