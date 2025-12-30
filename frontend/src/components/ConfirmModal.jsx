export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Background overlay with blur */}
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal box */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="font-semibold text-lg mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-1.5 bg-black text-white rounded hover:opacity-90"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
